import express from "express";
import bodyParser, { OptionsJson } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import serviceRoutes from "./routes/services.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import compression from "compression";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

// aws config
import multerS3 from "multer-s3";
import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { ConnectionOptions } from "tls";

interface RequestBodyProps {
  body: {
    userName: string;
    email: string;
    bio: string;
    password: string;
    picturePath: string;
    friends: string[];
  };
  file: {
    location: string;
  };
}

interface ControllerProps {
  req: Request & RequestBodyProps;
  res: Response;
}

/* CONFIGURATIONS */
// amazon config

const s3Config: S3ClientConfig = {
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
};

const s3 = new S3Client(s3Config);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true } as OptionsJson));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const upload = (path: string) =>
  multer({
    storage: multerS3({
      s3,
      bucket: `${process.env.BUCKET_NAME}`,
      metadata: function (_, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (_, file, cb) {
        const newFileName = `image-${file.originalname}-${Date.now()}.jpeg`;
        const fullPath = `${path}/` + newFileName;
        cb(null, fullPath);
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
  });

const register = async ({ req, res }: ControllerProps) => {
  try {
    const { userName, email, bio, password, picturePath, friends } = req.body;
    const awsPicturePath = req.file.location;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      bio,
      password: passwordHash,
      picturePath: awsPicturePath,
      friends,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ROUTES WITH FILES */
app.post(
  "/auth/register",
  upload("User-profile-picture").single("picture"),
  register
);
app.post(
  "/posts",
  verifyToken,
  upload("User-posts").single("picture"),
  createPost
);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/services", serviceRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
await mongoose
  .connect(process.env.MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectionOptions)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

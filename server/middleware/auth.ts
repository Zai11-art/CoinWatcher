import jwt, {Secret} from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface VerifyTokenProps {
  req: Request & { user?: string };
  res: Response;
  next: NextFunction;
}

export const verifyToken = async ({ req, res, next }: VerifyTokenProps) => {
  try {
    let token = req.header("Authorization"); // grabs the auth header

    // if token does not exist
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // if token exist and reiterate token
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET as Secret) as string;
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

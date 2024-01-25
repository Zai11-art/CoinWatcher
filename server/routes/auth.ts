import express from "express";
import { login, register } from "../controllers/auth.js";
import upload from "../upload/image.js";

const router = express.Router();

router.post("/login", login);
router.post(
  "/register",
  upload("User-profile-picture").single("picture"),
  register
);

export default router;

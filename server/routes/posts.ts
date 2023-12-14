import express from "express";
import { addComment, deleteComment, deletePost, getFeedPosts,  getUserPosts,  likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.delete("/", verifyToken, deletePost);
router.get("/:userId/posts", verifyToken, getUserPosts); 

// COMMENTS
router.post("/:id/comments", verifyToken, addComment); 
router.delete("/:id/comments", verifyToken, deleteComment); 

// LIKES
router.patch("/:id/like", verifyToken, likePost);

export default router;
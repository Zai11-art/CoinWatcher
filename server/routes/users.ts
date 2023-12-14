import express from "express"; // backend framework
import {
    getUser, 
    getUserFriends,
    addRemoveFriend,
    addFollowing,
    getFollowers,
    addToWatchList,
    removeToWatchList,
} from "../controllers/users.js"; // controllers for user handling
import { verifyToken } from "../middleware/auth.js"; // verify using jwt

const router = express.Router();

//  READ 
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);    
router.get("/:id/followers", verifyToken, getFollowers);    

// UPDATE
router.post("/:id", verifyToken, addToWatchList);
router.delete("/:id", verifyToken, removeToWatchList);
router.patch("/:id/:friendId", verifyToken, addFollowing);

export default router;


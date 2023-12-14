import express from "express"; // backend framework
import { getUser, getUserFriends, addFollowing, getFollowers, addToWatchList, removeToWatchList, } from "../controllers/users"; // controllers for user handling
import { verifyToken } from "../middleware/auth"; // verify using jwt
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb3V0ZXMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDLENBQUMsb0JBQW9CO0FBQ25ELE9BQU8sRUFDSCxPQUFPLEVBQ1AsY0FBYyxFQUVkLFlBQVksRUFDWixZQUFZLEVBQ1osY0FBYyxFQUNkLGlCQUFpQixHQUNwQixNQUFNLHNCQUFzQixDQUFDLENBQUMsZ0NBQWdDO0FBQy9ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQyxDQUFDLG1CQUFtQjtBQUVyRSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsU0FBUztBQUNULE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFeEQsU0FBUztBQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUN0RCxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUUxRCxlQUFlLE1BQU0sQ0FBQyJ9
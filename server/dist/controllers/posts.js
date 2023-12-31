import Post from "../models/Post";
import User from "../models/User";
import Comment from "../models/Comment";
/* CREATE */
export const createPost = async ({ req, res }) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            userName: user?.userName,
            bio: user?.bio,
            description,
            userPicturePath: user?.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
};
/* READ */
export const getFeedPosts = async ({ req, res }) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
export const getUserPosts = async ({ req, res }) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
/* UPDATE */
export const likePost = async ({ req, res }) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post?.likes?.get(userId);
        if (isLiked) {
            post?.likes?.delete(userId);
        }
        else {
            post?.likes?.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post?.likes }, { new: true });
        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
// CREATE COMMENT ON POST
export const addComment = async ({ req, res }) => {
    try {
        const { picturePath, comment, commentor } = req.body;
        const { id } = req.params;
        const user = await User.findById(commentor);
        const post = await Post.findById(id);
        const newComment = new Comment({
            postId: post?._id,
            userName: user?.userName,
            userId: commentor,
            bio: user?.bio,
            comment: comment,
            userPicturePath: picturePath,
            likes: {},
        });
        if (!post) {
            throw new Error("Post not found");
        }
        post.comments = post.comments.concat(newComment);
        await newComment.save();
        await post.save();
        res.status(200).json(post.comments);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
// REMOVE COMMENT ON POST
export const deleteComment = async ({ req, res }) => {
    try {
        const { commentId } = req.body;
        const { id } = req.params;
        const post = await Post.findById(id);
        const commentIndex = post?.comments.findIndex((comment) => comment._id === commentId);
        console.log(commentIndex);
        if (commentIndex === -1) {
            throw new Error("Comment does not exist");
        }
        post?.comments.splice((commentIndex ? commentIndex : 0) - 1, 1);
        await post?.save();
        res.status(200).json(post?.comments);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
/* DELETE POST */
export const deletePost = async ({ req, res }) => {
    try {
        const { postId } = req.body;
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy9wb3N0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSxnQkFBZ0IsQ0FBQztBQUNsQyxPQUFPLElBQUksTUFBTSxnQkFBZ0IsQ0FBQztBQUNsQyxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQWlCeEMsWUFBWTtBQUNaLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFtQixFQUFFLEVBQUU7SUFDaEUsSUFBSTtRQUNGLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDdEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDO1lBQ3ZCLE1BQU07WUFDTixRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVE7WUFDeEIsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHO1lBQ2QsV0FBVztZQUNYLGVBQWUsRUFBRSxJQUFJLEVBQUUsV0FBVztZQUNsQyxXQUFXO1lBQ1gsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUMsQ0FBQztRQUNILE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXJCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFH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
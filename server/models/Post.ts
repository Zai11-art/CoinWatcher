import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  bio: String,
  description: String,
  picturePath: String,
  userPicturePath: String,
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: {
    type: Array,
    default: [],
  },
},
  { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;

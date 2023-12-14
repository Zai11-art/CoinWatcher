import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    coinWatchList: {
      type: Array,
      default: [],
      validate: [limitArray(20), "Cannot have more than 20 coins in watchlist"],
    },
    bio: String,
    impressions: Number,
  },
  {
    timestamps: true,
  }
);

function limitArray(limit: number) {
  return function (value: []) {
    return value?.length <= limit;
  };
}

const User = mongoose.model("User", Userschema);

export default User;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  userName: string;
  picturePath: string;
  _id: string;
  friends: any[];
  followers: any[];
}

interface Post {
  _id: string;
  userId: string;
  userName: string;
  description: string;
  bio: string;
  picturePath: string;
  userPicturePath: string;
  likes: any[];
  comments: any[];
  createdAt: string;
}

interface StateAuth {
  mode: "light" | "dark";
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  posts: Post[];
}

const initialState: StateAuth = {
  mode: "light",
  isLoggedIn: false,
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (
      state,
      action: PayloadAction<{ user: User; friends: any[] }>
    ) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setFollowers: (
      state,
      action: PayloadAction<{ user: User; followers: any[] }>
    ) => {
      if (state.user) {
        state.user.followers = action.payload.followers;
      } else {
        console.error("Followers non-existent :(");
      }
    },
    setPosts: (state, action: PayloadAction<{ posts: any[] }>) => {
      state.posts = action.payload.posts;
    },
    setUserPosts: (
      state,
      action: PayloadAction<{ user: User; posts: any[] }>
    ) => {
      const matchedUserPosts = state.posts.filter(
        (post) => post.userName === action.payload.user.userName
      );
      state.posts = matchedUserPosts;
    },
    setPost: (state, action: PayloadAction<{ post: Post }>) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setComments: (
      state,
      action: PayloadAction<{ postId: string; comment: any[] }>
    ) => {
      const { postId, comment } = action.payload;
      const updatedPosts = state.posts.map((post) => {
        if (post._id === postId) {
          const updatedComments = [...post.comments, comment];
          return { ...post, comments: updatedComments };
        }
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setFollowers,
  setUserPosts,
  setComments,
} = authSlice.actions;
export default authSlice.reducer;

export type RootState = ReturnType<typeof authSlice.reducer>;

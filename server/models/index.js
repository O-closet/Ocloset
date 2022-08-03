import mongoose from "mongoose"
import PostSchema from "./schemas/post.js"
import UserSchema from "./schemas/user.js"

export const Post = mongoose.model("Post", PostSchema);
export const User = mongoose.model("User", UserSchema);

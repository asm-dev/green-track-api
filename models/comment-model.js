import mongoose from "../config/mongo.js";

const CommentSchema = new mongoose.Schema({
  reportId: String,
  user: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: String,
  author: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };
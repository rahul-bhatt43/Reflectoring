const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: {
    type: Number,
    default: 0, // Set a default value to ensure it's always a number
  },
  tags: [String],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };

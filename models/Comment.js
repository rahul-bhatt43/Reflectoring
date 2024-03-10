const Comment = mongoose.model("Comment", {
    content: String,
    author: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

module.exports = { Comment };
const { Comment } = require("./models/Comment.js");
const { Post } = require("./models/Post.js");

const resolvers = {
  Query: {
    hello: () => "Hello from Reflectoring Blog",
    welcome: (parent, args) => `Hello ${args.name}`,
    posts: async (parent, { page = 1, pageSize = 10 }) => {
      const skip = (page - 1) * pageSize;
      return await Post.find({}).skip(skip).limit(pageSize).populate('comments');
    },
    post: async (parent, args) => await Post.findById(args.id).populate('comments'),
    searchPosts: async (parent, { query }) => {
      return await Post.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
        ],
      }).populate('comments');
    },
  },
  Mutation: {
    createPost: async (parent, args) => {
      const { title, content, author } = args;
      const newPost = new Post({
        title,
        content,
        author,
      });
      await newPost.save();
      return newPost;
    },
    updatePost: async (parent, args) => {
      const { id } = args;
      const updatedPost = await Post.findByIdAndUpdate(id, args);
      if (!updatedPost) {
        throw new Error(`Post with ID ${id} not found`);
      }
      return updatedPost;
    },
    deletePost: async (parent, args) => {
      const { id } = args;
      const deletedPost = await Post.findByIdAndDelete(id);
      if (!deletedPost) {
        throw new Error(`Post with ID ${id} not found`);
      }
      return deletedPost;
    },
    likePost: async (parent, { id }) => {
      const post = await Post.findById(id);
      if (!post) {
        throw new Error(`Post with ID ${id} not found`);
      }
      post.likes += 1;
      await post.save();
      return post;
    },
    unlikePost: async (parent, { id }) => {
      const post = await Post.findById(id);
      if (!post) {
        throw new Error(`Post with ID ${id} not found`);
      }
      post.likes = Math.max(0, post.likes - 1);
      await post.save();
      return post;
    },
    updateComment: async (parent, { commentId, content }) => {
      const comment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
      if (!comment) {
        throw new Error(`Comment with ID ${commentId} not found`);
      }
      return comment;
    },
    deleteComment: async (parent, { commentId }) => {
      const comment = await Comment.findByIdAndDelete(commentId);
      if (!comment) {
        throw new Error(`Comment with ID ${commentId} not found`);
      }
      return comment;
    },
    createComment: async (parent, { postId, content, author }) => {
      console.log('Creating comment:', { postId, content, author });
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error(`Post with ID ${postId} not found`);
      }
      const newComment = new Comment({
        content,
        author,
        post: postId,
      });
      await newComment.save();
      post.comments.push(newComment._id);
      await post.save();
      console.log('Comment created successfully');
      return newComment;
    },
  },
};

module.exports = { resolvers };

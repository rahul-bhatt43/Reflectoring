const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    hello: String
    welcome(name: String): String
    posts(page: Int, pageSize: Int): [Post] # return array of blog posts
    post(id: ID): Post # return blog post by id
    searchPosts(query: String): [Post]
  }
  
  type Post {
    id: ID
    title: String
    content: String
    author: String
    comments: [Comment]
    likes: Int
    tags: [String]
  }

  type Comment {
    id: ID
    content: String
    author: String
    post: Post
  }

  type Mutation {
    createPost(title: String, content: String, author: String): Post
    updatePost(id: ID, title: String, content: String, author: String): Post
    deletePost(id: ID): Post
    likePost(id: ID): Post
    unlikePost(id: ID): Post
    createComment(postId: ID, content: String, author: String): Comment
    updateComment(commentId: ID, content: String): Comment
    deleteComment(commentId: ID): Comment
  }
`;

module.exports = { typeDefs };

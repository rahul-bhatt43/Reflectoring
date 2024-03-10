const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./models/typeDefs.js");
const { Post } = require("./models/Post.js");
const { Comment } = require("./models/Comment.js");

const MONGO_URI = "mongodb://127.0.0.1:27017/postGQL";

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch(err => {
    console.log(err.message);
  });

// Register models
mongoose.model("Post", Post.schema);
mongoose.model("Comment", Comment.schema);

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
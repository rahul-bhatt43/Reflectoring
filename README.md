# Reflectoring
Reflectoring is a blog based backend developed by Rahul Bhatt/Mr.Coder, the main tech stack is nodejs / graphql and apollo client here i am creating the gql type APIs(but it is for the learning purpose only)

This project serves as the backend for a blog web application using GraphQL and Apollo Server. It utilizes MongoDB as the database with Mongoose for data modeling.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rahul-bhatt43/Reflectoring/
cd Reflectoring
```

2. Install dependencies:

```bash
npm install
```

3. Set up your MongoDB connection by replacing the `MONGO_URI` in `index.js` with your own MongoDB URI.

## Running the Server

Start the server using the following command:

```bash
npm start
```

The server will be accessible at `http://localhost:4000`.

## Queries and Mutations

### BlogPosts

#### Create a Post

```graphql
mutation Mutation($title: String, $content: String, $author: String) {
  createPost(title: $title, content: $content, author: $author) {
    id
    title
    content
    author
  }
}
```

#### Get All Posts

```graphql
query Posts {
  posts {
    id
    title
    content
    author
  }
}
```

#### Get a Single Post

```graphql
query Posts($postId: ID) {
  post(id: $postId) {
    id
    title
    content
    author
  }
}
```

#### Update a Post

```graphql
mutation Mutation($updateId: ID, $title: String, $content: String, $author: String) {
  updatePost(id: $updateId, title: $title, content: $content, author: $author) {
    id
    title
    content
    author
  }
}
```

#### Delete a Post

```graphql
mutation Mutation($deleteId: ID) {
  deletePost(id: $deleteId) {
    id
    title
    content
    author
  }
}
```

#### Get a Post with Comments

```graphql
query Posts($postId: ID) {
  post(id: $postId) {
    id
    title
    content
    author
    comments {
      id
      content
      author
    }
    likes
    tags
  }
}
```

### Comments

#### Create a Comment

```graphql
mutation CreateComment($postId: ID, $content: String, $author: String) {
  createComment(postId: $postId, content: $content, author: $author) {
    id
    content
    author
  }
}
```

#### Update a Comment

```graphql
mutation UpdateComment($commentId: ID, $content: String) {
  updateComment(commentId: $commentId, content: $content) {
    id
    content
    author
  }
}
```

#### Delete a Comment

```graphql
mutation DeleteComment($commentId: ID) {
  deleteComment(commentId: $commentId) {
    id
    content
    author
  }
}
```

### Like/Unlike

#### Like a Post

```graphql
mutation Like($postId: ID) {
  likePost(id: $postId) {
    id
    title
    content
    author
    likes
  }
}
```

#### Unlike a Post

```graphql
mutation Unlike($postId: ID) {
  unlikePost(id: $postId) {
    id
    title
    content
    author
    likes
  }
}
```

### Search

#### Search for Posts

```graphql
query Search($searchWord: String) {
  searchPosts(query: $searchWord) {
    id
    title
    content
    author
    comments {
      id
      content
      author
    }
    likes
    tags
  }
}
```

### Pagination

#### Get Paginated Posts

```graphql
query Pagination($pageNum: Int) {
  posts(page: $pageNum, pageSize: 5) {
    id
    title
    content
    author
    comments {
      id
      content
      author
    }
    likes
    tags
  }
}
```
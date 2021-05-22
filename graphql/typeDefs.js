const { gql } = require("apollo-server");

module.exports = gql`
  type Contract {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getContracts: [Contract]
    getContract(postId: ID!): Contract
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createContract(body: String!): Contract!
    deleteContract(postId: ID!): String!
    createComment(postId: String!, body: String!): Contract!
    deleteComment(postId: ID!, commentId: ID!): Contract!
    likeContract(postId: ID!): Contract!
  }
`;

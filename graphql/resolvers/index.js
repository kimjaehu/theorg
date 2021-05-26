const contractResolvers = require("./contracts");
const userResolvers = require("./users");
const CommentsResolvers = require("./comments");

module.exports = {
  Contract: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...contractResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...contractResolvers.Mutation,
    ...CommentsResolvers.Mutation,
  },
  Subscription: {
    ...contractResolvers.Subscription,
  },
};

const contractResolvers = require("./contracts");
const userResolvers = require("./users");
const CommentsResolvers = require("./comments");

module.exports = {
  Query: {
    ...contractResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...contractResolvers.Mutation,
    ...CommentsResolvers.Mutation,
  },
};

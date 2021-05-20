const contractResolvers = require("./contracts");
const userResolvers = require("./users");

module.exports = {
  Query: {
    ...contractResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

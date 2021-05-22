const { AuthenticationError, UserInputError } = require("apollo-server");

const Contract = require("../../models/Contract");
const checkAuth = require("../../util/check-auth");
const CheckAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getContracts() {
      try {
        const contracts = await Contract.find().sort({ createdAt: -1 });
        return contracts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getContract(_, { postId }) {
      try {
        const contract = await Contract.findById(postId);
        if (contract) {
          return contract;
        } else {
          throw new Error("Contract not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createContract(_, { body }, context) {
      const user = CheckAuth(context);
      console.log(context);

      const newContract = new Contract({
        body,
        user: user.postId,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const contract = await newContract.save();

      return contract;
    },
    async deleteContract(_, { postId }, context) {
      const user = CheckAuth(context);

      try {
        const contract = await Contract.findById(postId);
        if (user.username === contract.username) {
          await contract.delete();
          return "Contract deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likeContract(_, { postId }, context) {
      const { username } = checkAuth(context);

      const contract = await Contract.findById(postId);
      if (contract) {
        if (contract.likes.find((like) => like.username === username)) {
          // contract already likes, unlike it
          contract.likes = contract.likes.filter(
            (like) => like.username !== username
          );
        } else {
          // Not liked, like contract
          contract.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await contract.save();
        return contract;
      } else throw new UserInputError("Contract not found");
    },
  },
};

const { AuthenticationError, UserInputError } = require("apollo-server");

const checkAuth = require("../../util/check-auth");
const Contract = require("../../models/Contract");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment cannot be empty",
          },
        });
      }

      const contract = await Contract.findById(postId);

      if (contract) {
        contract.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        await contract.save();
        return contract;
      } else throw new UserInputError("Contract not found");
    },

    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const contract = await Contract.findById(postId);

      if (contract) {
        const commentIndex = contract.comments.findIndex(
          (c) => c.id === commentId
        );

        if (contract.comments[commentIndex].username === username) {
          contract.comments.splice(commentIndex, 1);
          await contract.save();
          return contract;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Contract not found");
      }
    },
  },
};

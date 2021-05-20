const Contract = require("../../models/Contract");

module.exports = {
  Query: {
    async getContracts() {
      try {
        const contracts = await Contract.find();
        return contracts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

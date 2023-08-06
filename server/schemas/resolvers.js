const { User } = require("../models");
const { signToken } = require("../utils/auth"); // Removed AuthenticationError import
const { AuthenticationError } = require("apollo-server-express"); // Added AuthenticationError import

const resolvers = {
  Query: {
    me: async (parents, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__ -password"
        );
  
        return userData;
      }
  
      throw new AuthenticationError("Not logged in"); // Pass a message to the AuthenticationError
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
  
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new AuthenticationError("Incorrect credentials"); // Pass a message to the AuthenticationError
      }
  
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials"); // Pass a message to the AuthenticationError
      }
  
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );
  
        return updatedUser;
      }
  
      throw new AuthenticationError("Not logged in"); // Pass a message to the AuthenticationError
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
        );
  
        return updatedUser;
      }
  
      throw new AuthenticationError("Not logged in"); // Pass a message to the AuthenticationError
    },
  },
};

module.exports = resolvers;

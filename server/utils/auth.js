const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Middleware function for authenticating GraphQL requests
  authMiddleware: function ({ req, res, next }) {
    let token = req.headers.authorization || '';

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trim();
    }

    if (!token) {
      throw new AuthenticationError('You have no token!');
    }

    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch (error) {
      console.log('Invalid token');
      throw new AuthenticationError('Invalid token!');
    }

    next();
  },

  // Function for signing JWT tokens
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

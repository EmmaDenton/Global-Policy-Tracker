const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const authMiddleware = (req) => {
  let token = req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return null;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    return data;
  } catch {
    console.log('Invalid token');
    return null;
  }
};
const signToken = ({ username, email, _id }) => {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  };

module.exports = { authMiddleware, signToken };
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Retrieve token from request header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Access denied. No access token granted.' });
  }

  // Validate token
  try {
    const decodedToken = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Access denied. Invalid token.' });
  }
};

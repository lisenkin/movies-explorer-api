const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');

// jwt = '' как в место
module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie) {
    throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
  }
  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
  }
  req.user = payload;
  next();
};

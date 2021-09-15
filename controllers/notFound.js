const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
};

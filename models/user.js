const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { INVALID_EMAIL_MESSAGE, INVALID_CREDENTIALS_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlengtn: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: INVALID_EMAIL_MESSAGE,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(INVALID_CREDENTIALS_MESSAGE));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(INVALID_CREDENTIALS_MESSAGE));
          }
          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);

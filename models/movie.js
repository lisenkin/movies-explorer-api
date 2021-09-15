const validator = require('validator');
const mongoose = require('mongoose');
const { INVALID_LINK_MESSAGE } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (link) => validator.isURL(link),
      message: INVALID_LINK_MESSAGE,
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator: (link) => validator.isURL(link),
      message: INVALID_LINK_MESSAGE,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (link) => validator.isURL(link),
      message: INVALID_LINK_MESSAGE,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

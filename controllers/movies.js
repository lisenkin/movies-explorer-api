const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const {
  MOVIE_NOT_FOUND_MESSAGE, MOVIES_NOT_FOUND_MESSAGE, BAD_REQUEST_MESSAGE, FORBIDDEN_MESSAGE,
  MOVIE_DELETED_MESSAGE,
} = require('../utils/constants');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (movies.length >= 1) {
        res.send(movies);
      } else {
        throw new NotFoundError(MOVIES_NOT_FOUND_MESSAGE);
      }
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(MOVIE_NOT_FOUND_MESSAGE))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return movie.remove()
          .then(() => res.send({ message: MOVIE_DELETED_MESSAGE }));
      }
      throw new ForbiddenError(FORBIDDEN_MESSAGE);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

const express = require('express');

const moviesRoute = express.Router();
const { deleteMovie, createMovie, getSavedMovies } = require('../controllers/movies');
const { movieIdValidation, movieDataValidation } = require('../middlewares/validation');

moviesRoute.get('/', getSavedMovies);
// удаление по movieid
moviesRoute.delete('/:movieId', movieIdValidation, deleteMovie);
moviesRoute.post('/', movieDataValidation, createMovie);

module.exports = moviesRoute;

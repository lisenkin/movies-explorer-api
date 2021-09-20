require('dotenv').config();

const {
  JWT_SECRET = 'dev-secret', DB_URI = 'mongodb://localhost:27017/moviesdb', PORT = 3000,
} = process.env;

module.exports = {
  JWT_SECRET,
  DB_URI,
  PORT,
};

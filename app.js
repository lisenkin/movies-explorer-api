const express = require('express');
const mongoose = require('mongoose');
// const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
const cors = require('cors');

// const { errors } = require('celebrate');
// const route = require('./routes/index');
// const { limiter } = require('./middlewares/limiter');
// const errorHandler = require('./middlewares/errorHandler');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

const { DB_URI, PORT } = require('./utils/config');

const app = express();

app.use(cors({
  origin: true,
  exposedHeaders: '*',
  credentials: true,
}));

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
/*
app.use(requestLogger);

app.use(limiter);

app.use(cookieParser());

app.use(express.json());

app.use(helmet());
*/
// app.use('/', route);
/*
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
*/

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})

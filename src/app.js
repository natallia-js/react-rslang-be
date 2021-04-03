const YAML = require('yamljs');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const { NOT_FOUND } = require('http-status-codes');
require('express-async-errors');

const errorHandler = require('./errors/errorHandler');
const winston = require('./common/logging');
const { userIdValidator } = require('./utils/validation/validator');

const aggregatedWordsRouter = require('./resources/aggregatedWords/aggregatedWord.router');
const checkAuthentication = require('./resources/authentication/checkAuthentication');
const gameRouter = require('./resources/games/game.router');
const gameStatisticRouter = require('./resources/game-statistics/game-statistic.router');
const settingRouter = require('./resources/settings/setting.router');
const signinRouter = require('./resources/authentication/signin.router');
const userRouter = require('./resources/users/user.router');
const userTokenRouter = require('./resources/token/token.router');
const userWordsRouter = require('./resources/userWords/userWord.router');
const userWordsStatRouter = require('./resources/userWordsStat/userWord.router');
const wordRouter = require('./resources/words/word.router');
const wordStatisticRouter = require('./resources/word-statistics/word-statistic.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/files', express.static(path.join(__dirname, '../files')));

app.use(checkAuthentication);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  morgan(
    ':method :status :url :userId size req :req[content-length] res :res[content-length] - :response-time ms',
    {
      stream: winston.stream,
    }
  )
);

app.use('/games', gameRouter);
app.use('/signin', signinRouter);
app.use('/users', userRouter);
app.use('/words', wordRouter);

userRouter.use('/:id/aggregatedWords', userIdValidator, aggregatedWordsRouter);
userRouter.use('/:id/settings', userIdValidator, settingRouter);
userRouter.use('/:id/statistic/games', userIdValidator, gameStatisticRouter);
userRouter.use('/:id/statistic/words', userIdValidator, wordStatisticRouter);
userRouter.use('/:id/tokens', userIdValidator, userTokenRouter);
userRouter.use('/:id/words', userIdValidator, userWordsRouter);
userRouter.use('/:id/wordsStat', userIdValidator, userWordsStatRouter);

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use(errorHandler);

module.exports = app;

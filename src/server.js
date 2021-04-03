const logger = require('./common/logging');

// uncaughtException is been catching by Winston
process.on('unhandledRejection', (reason) => {
  process.emit('uncaughtException', reason);
});

// eslint-disable-next-line import/order
const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection
  .on('error', () => logger.error('MongoDB connection error:'))
  .once('open', () => {
    logger.info('Successfully connect to DB');
    app.listen(PORT, () => {
      logger.info(`App is running on http://localhost:${PORT}`);
      logger.info(`You can see REST APIs on http://localhost:${PORT}/doc`);
    });
  });

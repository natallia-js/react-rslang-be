const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

module.exports = {
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  JWT_EXPIRE_TIME: '4h',
  JWT_REFRESH_EXPIRE_TIME: 4.5 * 60 * 60,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  LOGS_DIR: path.join(__dirname, '../../logs'),
  MAX_OPTIONAL_PROPERTIES: 100,
  MAX_SYMBOLS_PER_OBJECT: 10000,
  MIN_PASSWORD_LENGTH: 8,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  UPLOADED_FILE_MAX_SIZE_IN_BYTES: 10 * 1024 * 1024,
  UPLOAD_DIR: path.join(__dirname, '../../uploads'),
};

const wordRepo = require('./userWord.db.repository');

const getDeletedWordsStatistic = async userId =>
  wordRepo.getDeletedWordsStatistic(userId);

module.exports = {
  getDeletedWordsStatistic
};

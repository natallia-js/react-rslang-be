const wordRepo = require('./userWord.db.repository');

const getDeletedWordsStatistic = async userId =>
  wordRepo.getDeletedWordsStatistic(userId);

const getHardWordsStatistic = async userId =>
  wordRepo.getHardWordsStatistic(userId);

module.exports = {
  getDeletedWordsStatistic,
  getHardWordsStatistic
};

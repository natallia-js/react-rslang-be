const wordStatisticRepo = require('./word-statistic.db.repository');

const getByUser = async userId => wordStatisticRepo.getByUser(userId);

const remove = async wordStatisticId =>
  wordStatisticRepo.remove(wordStatisticId);

const save = async (userId, wordStatistic) =>
  wordStatisticRepo.save({ wordStatistic, userId });

const update = async (userId, wordStatisticId, wordStatistic) =>
  wordStatisticRepo.update(wordStatisticId, { ...wordStatistic, userId });

module.exports = { getByUser, remove, save, update };

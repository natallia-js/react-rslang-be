const gameStatisticRepo = require('./game-statistic.db.repository');

const getByUser = async (userId) => gameStatisticRepo.getByUser(userId);

const remove = async (gameStatisticId) => gameStatisticRepo.remove(gameStatisticId);

const save = async (userId, gameStatistic) =>
  gameStatisticRepo.save({ gameStatistic, userId });

const update = async (userId, gameStatisticId, gameStatistic) =>
  gameStatisticRepo.update(gameStatisticId, { ...gameStatistic, userId });

module.exports = { getByUser, remove, save, update };

const GameStatistic = require('./game-statistic.model');

const getByUser = async userId => GameStatistic.find({ userId });

const remove = async gameStatisticId =>
  GameStatistic.findByIdAndDelete(gameStatisticId);

const save = async gameStatistic => GameStatistic.create(gameStatistic);

const update = async (gameStatisticId, gameStatistic) =>
  GameStatistic.findByIdAndUpdate(
    gameStatisticId,
    { $set: gameStatistic },
    { new: true }
  );

module.exports = { getByUser, remove, save, update };

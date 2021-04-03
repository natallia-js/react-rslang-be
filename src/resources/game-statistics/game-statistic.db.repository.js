const GameStatistic = require('./game-statistic.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const getByUser = async userId => {
  const userGameStatistic = await GameStatistic.find({ userId });
  if (!userGameStatistic) {
    throw new NOT_FOUND_ERROR('userGameStatistic', `userId: ${userId}`);
  }

  return userGameStatistic;
};

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

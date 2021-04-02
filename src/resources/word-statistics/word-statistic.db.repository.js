const WordStatistic = require('./word-statistic.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const getByUser = async userId => {
  const userWordStatistic = await WordStatistic.find({ userId });
  if (!userWordStatistic) {
    throw new NOT_FOUND_ERROR('userWordStatistic', `userId: ${userId}`);
  }

  return userWordStatistic;
};

const remove = async wordStatisticId =>
  WordStatistic.findByIdAndDelete(wordStatisticId);

const save = async wordStatistic => WordStatistic.create(wordStatistic);

const update = async (wordStatisticId, wordStatistic) =>
  WordStatistic.findByIdAndUpdate(
    wordStatisticId,
    { $set: wordStatistic },
    { new: true }
  );

module.exports = { getByUser, remove, save, update };

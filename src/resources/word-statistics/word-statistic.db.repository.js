const WordStatistic = require('./word-statistic.model');

const getByUser = async (userId) => WordStatistic.find({ userId });

const remove = async (wordStatisticId) =>
  WordStatistic.findByIdAndDelete(wordStatisticId);

const save = async (wordStatistic) => WordStatistic.create(wordStatistic);

const update = async (wordStatisticId, wordStatistic) =>
  WordStatistic.findByIdAndUpdate(
    wordStatisticId,
    { $set: wordStatistic },
    { new: true }
  );

module.exports = { getByUser, remove, save, update };

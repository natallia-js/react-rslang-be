const mongoose = require('mongoose');
const UserWord = require('./userWord.model');

const lookup = {
  $lookup: {
    from: 'words',
    localField: 'wordId',
    foreignField: '_id',
    as: 'userWord',
  },
};

const pipeline = [
  {
    $unwind: {
      path: '$userWord',
      preserveNullAndEmptyArrays: true,
    },
  },
];

const group = {
  $group: {
    _id: { group: '$userWord.group', page: '$userWord.page' },
    count: { $sum: 1 },
  },
};

const getDeletedWordsStatistic = async (userId) => {
  const matches = [];
  matches.push({
    $match: {
      $and: [{ userId: mongoose.Types.ObjectId(userId) }, { 'optional.deleted': true }],
    },
  });

  return UserWord.aggregate([...matches, lookup, ...pipeline, group]).exec();
};

const getHardWordsStatistic = async (userId) => {
  const matches = [];
  matches.push({
    $match: {
      $and: [
        { userId: mongoose.Types.ObjectId(userId) },
        { 'optional.mode': 'hard' },
        { $or: [{ 'optional.deleted': false }, { 'optional.deleted': null }] },
      ],
    },
  });

  return UserWord.aggregate([...matches, lookup, ...pipeline, group]);
};

const getStudiedWordsStatistic = async (userId) => {
  const matches = [];
  matches.push({
    $match: {
      $and: [
        { userId: mongoose.Types.ObjectId(userId) },
        { $or: [{ 'optional.mode': 'studied' }, { 'optional.mode': 'hard' }] },
      ],
    },
  });

  return UserWord.aggregate([...matches, lookup, ...pipeline, group]);
};

module.exports = {
  getDeletedWordsStatistic,
  getHardWordsStatistic,
  getStudiedWordsStatistic,
};

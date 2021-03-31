const mongoose = require('mongoose');
const UserWord = require('./userWord.model');

const getDeletedWordsStatistic = async userId => {
  const matches = [];
  matches.push({
    $match: {
      $and: [
        { userId: mongoose.Types.ObjectId(userId) },
        { 'optional.deleted': true }
      ]
    }
  });

  const lookup = {
    $lookup: {
      from: 'words',
      localField: 'wordId',
      foreignField: '_id',
      as: 'userWord'
    }
  };

  const pipeline = [
    {
      $unwind: {
        path: '$userWord',
        preserveNullAndEmptyArrays: true
      }
    }
  ];

  const group = {
    $group: {
      _id: { group: '$userWord.group', page: '$userWord.page' },
      count: { $sum: 1 }
    }
  };

  return await UserWord.aggregate([...matches, lookup, ...pipeline, group]);
};

module.exports = {
  getDeletedWordsStatistic
};

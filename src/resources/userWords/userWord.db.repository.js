const mongoose = require('mongoose');

const UserWord = require('./userWord.model');
const { NOT_FOUND_ERROR, ENTITY_EXISTS } = require('../../errors/appErrors');

const ENTITY_NAME = 'user word';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

const { ObjectId } = mongoose.Types;

const getAll = async (userId) => UserWord.find({ userId });

const get = async (wordId, userId) => {
  const userWord = await UserWord.findOne({ wordId, userId });
  if (!userWord) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { wordId, userId });
  }

  return userWord;
};

const getDeletedAmount = async (userId) => {
  const matches = [];
  matches.push({
    $match: {
      $and: [{ userId: ObjectId(userId) }, { 'optional.deleted': true }],
    },
  });

  const lookup = {
    $lookup: {
      from: 'words',
      localField: 'wordId',
      foreignField: '_id',
      as: 'userDeletedWord',
    },
  };

  const pipeline = [
    {
      $unwind: {
        path: '$userDeletedWord',
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const group = {
    $group: {
      _id: { group: '$userDeletedWord.group', page: '$userDeletedWord.page' },
      count: { $sum: 1 },
    },
  };

  return UserWord.aggregate([...matches, lookup, ...pipeline, group]);
};

const save = async (wordId, userId, userWord) => {
  try {
    return UserWord.create(userWord);
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      throw new ENTITY_EXISTS(`such ${ENTITY_NAME} already exists`);
    } else {
      throw err;
    }
  }
};

const upsert = async (wordId, userId, userWord) => {
  const { isStudied } = userWord;

  const update = { $set: userWord };
  if (isStudied === false) {
    update.$unset = { addedAt: '' };
  }
  return UserWord.findOneAndUpdate({ wordId, userId }, update, {
    new: true,
    setDefaultsOnInsert: true,
    upsert: true,
  });
};

const remove = async (wordId, userId) => UserWord.deleteOne({ wordId, userId });

module.exports = {
  get,
  getAll,
  getDeletedAmount,
  remove,
  save,
  upsert,
};

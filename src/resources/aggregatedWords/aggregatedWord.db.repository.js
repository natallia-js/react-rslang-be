const mongoose = require('mongoose');

const Word = require('../words/word.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const ENTITY_NAME = 'user word';

const lookup = {
  $lookup: {
    from: 'userWords',
    let: { word_id: '$_id' },
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [{ $eq: ['$userId', null] }, { $eq: ['$wordId', '$$word_id'] }],
          },
        },
      },
    ],
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
  {
    $unset: ['__v', 'userWord._id', 'userWord.wordId', 'userWord.userId', 'userWord.__v'],
  },
];

const get = async (wordId, userId) => {
  lookup.$lookup.pipeline[0].$match.$expr.$and[0].$eq[1] = mongoose.Types.ObjectId(
    userId
  );

  const match = {
    $match: {
      _id: mongoose.Types.ObjectId(wordId),
    },
  };

  const userWord = await Word.aggregate([match, lookup, ...pipeline]);
  if (!userWord) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { wordId, userId });
  }

  return userWord;
};

const getAll = async (userId, group, page, perPage, filter) => {
  lookup.$lookup.pipeline[0].$match.$expr.$and[0].$eq[1] = mongoose.Types.ObjectId(
    userId
  );

  const matches = [];
  if (group || group === 0) {
    matches.push({
      $match: {
        group,
      },
    });
  }

  if (filter) {
    matches.push({
      $match: {
        ...filter,
      },
    });
  }
  const facet = {
    $facet: {
      paginatedResults: [{ $skip: page * perPage }, { $limit: perPage }],
      totalCount: [
        {
          $count: 'count',
        },
      ],
    },
  };
  return Word.aggregate([lookup, ...pipeline, ...matches, facet]).exec();
};

const getAllFromDefinitePage = async (userId, group, page) => {
  lookup.$lookup.pipeline[0].$match.$expr.$and[0].$eq[1] = mongoose.Types.ObjectId(
    userId
  );

  const matches = [];

  if ((group || group === 0) && (page || page === 0)) {
    matches.push({
      $match: {
        $and: [{ group }, { page }],
      },
    });
  }

  return Word.aggregate([lookup, ...pipeline, ...matches]);
};

const getStudiedFromDefinitePage = async (userId, group, page) => {
  lookup.$lookup.pipeline[0].$match.$expr.$and[0].$eq[1] = mongoose.Types.ObjectId(
    userId
  );

  const matches = [];

  if ((group || group === 0) && (page || page === 0)) {
    matches.push({
      $match: {
        $and: [
          { group },
          { page },
          {
            $or: [
              { 'userWord.optional.mode': 'studied' },
              { 'userWord.optional.mode': 'hard' },
            ],
          },
        ],
      },
    });
  }

  return Word.aggregate([lookup, ...pipeline, ...matches]);
};

module.exports = {
  get,
  getAll,
  getAllFromDefinitePage,
  getStudiedFromDefinitePage,
};

const Game = require('./game.model');
const { ENTITY_EXISTS, NOT_FOUND_ERROR } = require('../../errors/appErrors');

const ENTITY_NAME = 'game';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

const getAll = async () => Game.find().exec();

const getByNum = async num => {
  const game = await Game.find({ num }).exec();
  if (!game) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { num });
  }

  return game;
};

const save = async game => {
  let gameEntity;
  try {
    gameEntity = await Game.create(game);
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      throw new ENTITY_EXISTS(`${ENTITY_NAME} with this 'num' already exists`);
    } else {
      throw err;
    }
  }
  return gameEntity;
};

const upsertByNum = async (num, game) =>
  Game.findOneAndUpdate(
    { num },
    { $set: game },
    { upsert: true, new: true }
  ).exec();

module.exports = { getAll, getByNum, save, upsertByNum };

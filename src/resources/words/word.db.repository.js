const Word = require('./word.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const ENTITY_NAME = 'word';

const get = async (id) => {
  const word = await Word.findById(id).exec();
  if (!word) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return word;
};

const getAll = async () => Word.find().exec();

const getAllByPage = async ({ group, page }) => Word.find({ group, page }).exec();

module.exports = { get, getAll, getAllByPage };

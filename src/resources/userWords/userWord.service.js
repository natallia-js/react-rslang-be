const wordRepo = require('./userWord.db.repository');

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

const getAll = async (userId) => wordRepo.getAll(userId);

const getDeletedAmount = async (userId) => wordRepo.getDeletedAmount(userId);

const remove = async (wordId, userId) => wordRepo.remove(wordId, userId);

const save = async (wordId, userId, userWord) =>
  wordRepo.save(wordId, userId, { ...userWord, wordId, userId });

const update = async (wordId, userId, userWord) =>
  wordRepo.update(wordId, userId, { ...userWord, wordId, userId });

module.exports = {
  get,
  getAll,
  getDeletedAmount,
  remove,
  save,
  update,
};

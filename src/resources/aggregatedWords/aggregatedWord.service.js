const wordRepo = require('./aggregatedWord.db.repository');

const getAll = async (userId, group, page, perPage, filter) =>
  wordRepo.getAll(userId, group, page, perPage, filter);

const getAllFromDefinitePage = async (userId, group, page) =>
  wordRepo.getAllFromDefinitePage(userId, group, page);

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

module.exports = {
  getAll,
  getAllFromDefinitePage,
  get
};

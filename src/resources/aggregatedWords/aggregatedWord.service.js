const wordRepo = require('./aggregatedWord.db.repository');

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

const getAll = async (userId, group, page, perPage, filter) =>
  wordRepo.getAll(userId, group, page, perPage, filter);

const getAllFromDefinitePage = async (userId, group, page) =>
  wordRepo.getAllFromDefinitePage(userId, group, page);

const getStudiedFromDefinitePage = async (userId, group, page) =>
  wordRepo.getStudiedFromDefinitePage(userId, group, page);

module.exports = {
  get,
  getAll,
  getAllFromDefinitePage,
  getStudiedFromDefinitePage,
};

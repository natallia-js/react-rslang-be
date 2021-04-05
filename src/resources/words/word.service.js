const wordRepo = require('./word.db.repository');

const get = async (wordId) => wordRepo.get(wordId);

const getAll = async () => wordRepo.getAll();

const getAllByPage = async (conditions) => wordRepo.getAllByPage(conditions);

module.exports = { get, getAll, getAllByPage };

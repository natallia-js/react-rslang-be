const wordRepo = require('./word.db.repository');

const get = async (wordId) => wordRepo.get(wordId);

const getAll = async (conditions) => wordRepo.getAll(conditions);

module.exports = { get, getAll };

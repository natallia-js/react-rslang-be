const gameRepo = require('./game.db.repository');

const getAll = async () => gameRepo.getAll();

const getByNum = async num => gameRepo.getByNum(Number.parseInt(num, 10));

const save = async game => gameRepo.save(game);

const upsertByNum = async (num, game) =>
  gameRepo.upsertByNum(num, { ...game, num });

module.exports = { getAll, getByNum, save, upsertByNum };

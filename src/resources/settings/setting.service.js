const settingRepo = require('./setting.db.repository');

const get = async (userId) => settingRepo.get(userId);

const remove = async (userId) => settingRepo.remove(userId);

const upsert = async (userId, statistic) =>
  settingRepo.upsert(userId, { ...statistic, userId });

module.exports = { get, remove, upsert };

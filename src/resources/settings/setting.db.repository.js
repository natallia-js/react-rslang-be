const Settings = require('./setting.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const get = async (userId) => {
  const setting = await Settings.findOne({ userId });
  if (!setting) {
    throw new NOT_FOUND_ERROR('Cannot find setting');
  }

  return setting;
};

const remove = async (userId) => Settings.findOneAndDelete({ userId });

const upsert = async (userId, setting) =>
  Settings.findOneAndUpdate({ userId }, { $set: setting }, { upsert: true, new: true });

module.exports = { get, upsert, remove };

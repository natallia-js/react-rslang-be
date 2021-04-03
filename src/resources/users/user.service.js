const bcrypt = require('bcrypt');

const usersRepo = require('./user.db.repository');
const tokenService = require('../token/token.service');
const settingsService = require('../settings/setting.service');
const { AUTHENTICATION_ERROR } = require('../../errors/appErrors');

const authenticate = async (user) => {
  const userEntity = await usersRepo.getUserByEmail(user.email);

  const isValidated = await bcrypt.compare(user.password, userEntity.password);
  if (!isValidated) {
    throw new AUTHENTICATION_ERROR();
  }

  const tokens = await tokenService.getTokens(userEntity._id);

  return {
    ...tokens,
    userId: userEntity._id,
    name: userEntity.name,
  };
};

const get = (id) => usersRepo.get(id);

const getPhoto = (id) => usersRepo.getPhoto(id);

const save = (user) => usersRepo.save(user);

const remove = async (id) => {
  await settingsService.remove(id);
  await usersRepo.remove(id);
};

const update = (id, user) => usersRepo.update(id, user);

module.exports = { authenticate, get, getPhoto, remove, save, update };

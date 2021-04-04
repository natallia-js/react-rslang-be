const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi);

const {
  MAX_OPTIONAL_PROPERTIES,
  MAX_SYMBOLS_PER_OBJECT,
  MIN_PASSWORD_LENGTH,
} = require('../../common/config');

function optionalValidator(value, helpers) {
  if (JSON.stringify(value).length > MAX_SYMBOLS_PER_OBJECT) {
    return helpers.error('object.length');
  }

  return value;
}

const optionalScheme = Joi.object()
  .max(MAX_OPTIONAL_PROPERTIES)
  .pattern(/.*/, [Joi.string(), Joi.number(), Joi.boolean(), Joi.date(), Joi.object()])
  .custom(optionalValidator, 'optional object validation')
  .error((errors) => {
    errors
      .filter((err) => err.code === 'object.length')
      .forEach((err) => {
        err.message = `Optional field exceeds the limit of ${MAX_SYMBOLS_PER_OBJECT} symbols per object`;
      });
    return errors;
  });

const schemas = {
  id: Joi.object({ id: JoiObjectId() }),
  wordId: Joi.object({ id: JoiObjectId(), wordId: JoiObjectId() }),
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string().max(200),
      email: Joi.string().email({ tlds: { allow: false } }),
      password: Joi.string().min(MIN_PASSWORD_LENGTH),
    }),
  userWord: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      isDeleted: Joi.boolean(),
      isDifficult: Joi.boolean(),
      group: Joi.number().integer().min(0).max(5).required(),
      page: Joi.number().integer().min(0).max(29).required(),
      addedAt: Joi.string().min(10).max(10),
      difficulty: Joi.string().max(50),
      optional: optionalScheme,
    }),
  gameStatisticParams: Joi.object({
    id: JoiObjectId(),
    gameStatisticId: JoiObjectId(),
  }),
  gameStatisticBody: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      gameId: JoiObjectId().required(),
      bestSeries: Joi.number().integer().min(0).required(),
      date: Joi.string().min(10).max(10).required(),
    }),
  wordStatisticParams: Joi.object({
    id: JoiObjectId(),
    wordStatisticId: JoiObjectId(),
  }),
  wordStatisticBody: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      wordId: JoiObjectId().required(),
      gameId: JoiObjectId().required(),
      group: Joi.number().integer().min(0).max(5),
      page: Joi.number().integer().min(0).max(29),
      correctAnswerTotal: Joi.number().integer().min(0),
      wrongAnswerTotal: Joi.number().integer().min(0),
      studiedAt: Joi.string().min(10).max(10),
    }),
  settings: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      wordsPerDay: Joi.number().integer().min(1).max(1000),
      optional: optionalScheme,
    }),
  gameSchema: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string().max(200).required(),
      num: Joi.number().integer().min(0).required(),
      img: Joi.string().max(50),
    }),
  gameNum: Joi.number().integer().min(0),
};

module.exports = schemas;

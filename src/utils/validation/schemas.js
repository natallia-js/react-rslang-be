const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const {
  MAX_OPTIONAL_PROPERTIES,
  MAX_SYMBOLS_PER_OBJECT,
  MIN_PASSWORD_LENGTH
} = require('../../common/config');

const optionalScheme = Joi.object()
  .max(MAX_OPTIONAL_PROPERTIES)
  .pattern(/.*/, [
    Joi.string(),
    Joi.number(),
    Joi.boolean(),
    Joi.date(),
    Joi.object()
  ])
  .custom(optionalValidator, 'optional object validation')
  .error(errors => {
    errors
      .filter(err => err.code === 'object.length')
      .forEach(
        err =>
          (err.message = `Optional field exceeds the limit of ${MAX_SYMBOLS_PER_OBJECT} symbols per object`)
      );
    return errors;
  });

const schemas = {
  id: Joi.object({ id: Joi.objectId() }),
  wordId: Joi.object({ id: Joi.objectId(), wordId: Joi.objectId() }),
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string().max(200),
      email: Joi.string().email({ tlds: { allow: false } }),
      password: Joi.string().min(MIN_PASSWORD_LENGTH)
    }),
  userWord: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      difficulty: Joi.string().max(50),
      isDeleted: Joi.boolean(),
      isDifficult: Joi.boolean(),
      group: Joi.number()
        .integer()
        .min(0)
        .max(5)
        .required(),
      page: Joi.number()
        .integer()
        .min(0)
        .max(29)
        .required(),
      optional: optionalScheme
    }),
  statistics: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      learnedWords: Joi.number()
        .integer()
        .min(0)
        .max(100000),
      optional: optionalScheme
    }),
  settings: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      wordsPerDay: Joi.number()
        .integer()
        .min(1)
        .max(1000),
      optional: optionalScheme
    }),
  gameSchema: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string()
        .max(200)
        .required(),
      num: Joi.number()
        .integer()
        .min(0)
        .required()
    }),
  gameNum: Joi.number()
    .integer()
    .min(0)
};

function optionalValidator(value, helpers) {
  if (JSON.stringify(value).length > MAX_SYMBOLS_PER_OBJECT) {
    return helpers.error('object.length');
  }

  return value;
}

module.exports = schemas;

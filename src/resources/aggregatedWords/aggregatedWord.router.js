const router = require('express').Router({ mergeParams: true });
const { OK } = require('http-status-codes');

const aggregatedWordsService = require('./aggregatedWord.service');
const extractQueryParam = require('../../utils/getQueryNumberParameter');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const { toResponse } = require('../../utils/toResponse');
const { validator } = require('../../utils/validation/validator');
const { wordId } = require('../../utils/validation/schemas');

router.get('/', async (req, res) => {
  const group = extractQueryParam(req.query.group);
  const page = extractQueryParam(req.query.page, 0);
  const perPage = extractQueryParam(req.query.wordsPerPage, 10);

  if (
    (req.query.group && Number.isNaN(group)) ||
    Number.isNaN(page) ||
    Number.isNaN(perPage)
  ) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the group, page and words-per-page numbers should be valid integers'
    );
  }

  const filter = req.query.filter ? JSON.parse(req.query.filter) : null;

  const words = await aggregatedWordsService.getAll(
    req.userId,
    group,
    page,
    perPage,
    filter
  );
  res.status(OK).send(words.map((w) => toResponse.call(w)));
});

router.get('/fromPage', async (req, res) => {
  const page = extractQueryParam(req.query.page, 0);
  const group = extractQueryParam(req.query.group);

  const words = await aggregatedWordsService.getAllFromDefinitePage(
    req.userId,
    group,
    page
  );
  res.status(OK).send(words.map((w) => toResponse.call(w)));
});

router.get('/studiedFromPage', async (req, res) => {
  const page = extractQueryParam(req.query.page, 0);
  const group = extractQueryParam(req.query.group);

  const words = await aggregatedWordsService.getStudiedFromDefinitePage(
    req.userId,
    group,
    page
  );
  res.status(OK).send(words.map((w) => toResponse.call(w)));
});

router.get('/:wordId', validator(wordId, 'params'), async (req, res) => {
  const word = await aggregatedWordsService.get(req.params.wordId, req.userId);

  res.status(OK).send(toResponse.call(word));
});

module.exports = router;

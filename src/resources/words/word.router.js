const router = require('express').Router();
const { OK } = require('http-status-codes');

const extractQueryParam = require('../../utils/getQueryNumberParameter');
const wordService = require('./word.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');

router.route('/').get(async (req, res) => {
  const page = extractQueryParam(req.query.page, 0);
  const group = extractQueryParam(req.query.group, 0);

  if (Number.isNaN(page) || Number.isNaN(group)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the group, page numbers should be valid integers'
    );
  }

  const words = await wordService.getAllByPage({
    group,
    page,
  });
  res.status(OK).send(words.map((word) => word.toResponse()));
});

router.route('/all').get(async (req, res) => {
  const words = await wordService.getAll();
  res.status(OK).send(words.map((word) => word.toResponse()));
});

router.route('/:id').get(async (req, res) => {
  const word = await wordService.get(req.params.id);
  res.status(OK).send(word.toResponse());
});

module.exports = router;

const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');

const wordStatisticService = require('./word-statistic.service');
const {
  id,
  wordStatisticBody,
  wordStatisticParams,
} = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');

router.get('/', validator(id, 'params'), async (req, res) => {
  const wordStatistics = await wordStatisticService.getByUser(req.userId);
  res.status(OK).send(wordStatistics.map((s) => s.toResponse()));
});

router.post(
  '/',
  validator(id, 'params'),
  validator(wordStatisticBody, 'body'),
  async (req, res) => {
    const wordStatistic = await wordStatisticService.save(req.userId, req.body);
    res.status(OK).send(wordStatistic.toResponse());
  }
);

router.delete(
  '/:wordStatisticId',
  validator(wordStatisticParams, 'params'),
  async (req, res) => {
    await wordStatisticService.remove(req.params.wordStatisticId);
    res.sendStatus(NO_CONTENT);
  }
);

router.put(
  '/:wordStatisticId',
  validator(wordStatisticParams, 'params'),
  validator(wordStatisticBody, 'body'),
  async (req, res) => {
    const statistic = await wordStatisticService.update(
      req.userId,
      req.params.wordStatisticId,
      req.body
    );
    res.status(OK).send(statistic.toResponse());
  }
);

module.exports = router;

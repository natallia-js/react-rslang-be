const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });

const gameStatisticService = require('./game-statistic.service');
const {
  id,
  gameStatisticBody,
  gameStatisticParams
} = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');

router.get('/', validator(id, 'params'), async (req, res) => {
  const gameStatistics = await gameStatisticService.getByUser(req.userId);
  res.status(OK).send(gameStatistics.map(s => s.toResponse()));
});

router.post(
  '/',
  validator(id, 'params'),
  validator(gameStatisticBody, 'body'),
  async (req, res) => {
    const gameStatistic = await gameStatisticService.save(req.userId, req.body);
    res.status(OK).send(gameStatistic.toResponse());
  }
);

router.delete(
  '/:gameStatisticId',
  validator(gameStatisticParams, 'params'),
  async (req, res) => {
    await gameStatisticService.remove(req.params.gameStatisticId);
    res.sendStatus(NO_CONTENT);
  }
);

router.put(
  '/:gameStatisticId',
  validator(gameStatisticParams, 'params'),
  validator(gameStatisticBody, 'body'),
  async (req, res) => {
    const statistic = await gameStatisticService.update(
      req.userId,
      req.params.gameStatisticId,
      req.body
    );
    res.status(OK).send(statistic.toResponse());
  }
);

module.exports = router;

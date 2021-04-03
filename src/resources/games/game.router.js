const router = require('express').Router();
const { OK } = require('http-status-codes');

const gameService = require('./game.service');
const { gameNum, gameSchema } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');

router.route('/').get(async (req, res) => {
  const games = await gameService.getAll();
  res.status(OK).send(games.map((w) => w.toResponse()));
});

router.get('/:gameNum', validator(gameNum, 'params'), async (req, res) => {
  const game = await gameService.getByNum(req.params.gameNum);
  res.status(OK).send(game.toResponse());
});

router.post('/', validator(gameSchema, 'body'), async (req, res) => {
  const game = await gameService.save(req.body);
  res.status(OK).send(game.toResponse());
});

router.put(
  '/:gameNum',
  validator(gameNum, 'params'),
  validator(gameSchema, 'body'),
  async (req, res) => {
    const game = await gameService.upsertByNum(req.params.gameNum, req.body);
    res.status(OK).send(game.toResponse());
  }
);

module.exports = router;

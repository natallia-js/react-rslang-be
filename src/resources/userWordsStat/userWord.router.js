const { OK } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });

const userWordService = require('./userWord.service');

router.get('/deletedWordsStat', async (req, res) => {
  const stat = await userWordService.getDeletedWordsStatistic(req.userId);
  res.status(OK).send(stat);
});

router.get('/hardWordsStat', async (req, res) => {
  const stat = await userWordService.getHardWordsStatistic(req.userId);
  res.status(OK).send(stat);
});

router.get('/studiedWordsStat', async (req, res) => {
  const stat = await userWordService.getStudiedWordsStatistic(req.userId);
  res.status(OK).send(stat);
});

module.exports = router;

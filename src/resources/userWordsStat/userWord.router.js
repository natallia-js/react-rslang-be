const { OK } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });

const userWordService = require('./userWord.service');

router.get('/deletedWordsStat', async (req, res) => {
  const stat = await userWordService.getDeletedWordsStatistic(req.userId);
  res.status(OK).send(stat);
});

module.exports = router;
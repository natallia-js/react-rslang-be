const mongoose = require('mongoose');

const { addMethods } = require('../../utils/toResponse');

const { Schema } = mongoose;

const WordStatistic = new Schema(
  {
    wordId: { type: Schema.Types.ObjectId, ref: 'Words', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    gameId: { type: Schema.Types.ObjectId, ref: 'games', required: true },
    group: { type: Number, required: true, min: 0, max: 5 },
    page: { type: Number, required: true, min: 0, max: 29 },
    correctAnswerTotal: { type: Number, required: true, min: 0, default: 0 },
    wrongAnswerTotal: { type: Number, required: true, min: 0, default: 0 },
    studiedAt: { type: Schema.Types.Date, required: true }
  },
  { collection: 'wordStatistic' }
);

WordStatistic.index({ userId: 1, studiedAt: 1 }, { unique: false });

addMethods(WordStatistic);

module.exports = mongoose.model('WordStatistic', WordStatistic);

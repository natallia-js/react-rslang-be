const mongoose = require('mongoose');

const { addMethods } = require('../../utils/toResponse');

const { Schema } = mongoose;

const GameStatistic = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    gameId: { type: Schema.Types.ObjectId, ref: 'games', required: true },
    bestSeries: { type: Number, required: true, min: 0, default: 0 },
    date: { type: Schema.Types.Date, required: true }
  },
  { collection: 'gameStatistic' }
);

GameStatistic.index({ userId: 1, date: 1 }, { unique: false });

addMethods(GameStatistic);

module.exports = mongoose.model('GameStatistic', GameStatistic);

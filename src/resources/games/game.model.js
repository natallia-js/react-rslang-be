const mongoose = require('mongoose');

const { addMethods } = require('../../utils/toResponse');

const { Schema } = mongoose;

const Game = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    num: {
      type: Number,
      required: true,
      unique: true
    }
  },
  { collection: 'games' }
);

addMethods(Game);

module.exports = mongoose.model('Game', Game);

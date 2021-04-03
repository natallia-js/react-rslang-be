const mongoose = require('mongoose');

const { addMethods } = require('../../utils/toResponse');

const { Schema } = mongoose;

const SettingsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    wordsPerDay: {
      type: Number,
    },
    optional: {
      type: Object,
      required: false,
    },
  },
  { collection: 'setting' }
);

addMethods(SettingsSchema);

module.exports = mongoose.model('Settings', SettingsSchema);

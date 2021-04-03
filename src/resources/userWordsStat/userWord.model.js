const mongoose = require('mongoose');

const { addMethods } = require('../../utils/toResponse');

const { Schema } = mongoose;

const UserWordsSchema = new Schema(
  {
    wordId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    difficulty: { type: String, required: false },
    optional: {
      type: Object,
      required: false,
    },
  },
  { collection: 'userWords' }
);

UserWordsSchema.index({ wordId: 1, userId: 1 }, { unique: true });

addMethods(UserWordsSchema);

module.exports =
  mongoose.models.UserWords || mongoose.model('UserWords', UserWordsSchema);

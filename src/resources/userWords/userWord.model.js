const mongoose = require('mongoose');

const { addMethods } = require('../../utils/toResponse');

const { Schema } = mongoose;

const UserWordsSchema = new Schema(
  {
    wordId: { type: Schema.Types.ObjectId, ref: 'Words', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    difficulty: { type: String, required: false, maxlength: 50 },
    optional: {
      type: Object,
      required: false
    }
  },
  { collection: 'userWords' }
);

UserWordsSchema.index({ wordId: 1, userId: 1 }, { unique: true });

addMethods(UserWordsSchema);

module.exports = mongoose.model('UserWords', UserWordsSchema);

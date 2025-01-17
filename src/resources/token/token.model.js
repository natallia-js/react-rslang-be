const mongoose = require('mongoose');

const { Schema } = mongoose;

const Token = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    tokenId: { type: String, required: true },
    expire: { type: Number, required: true },
  },
  { collection: 'tokens' }
);

Token.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('tokens', Token);

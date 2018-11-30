const mongoose = require('mongoose');

const { Schema } = mongoose;

const LinkSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  votes: {
    type: [Schema.Types.ObjectId],
    ref: 'Vote',
  },
});

LinkSchema.index({
  '$**': 'text',
});

module.exports = mongoose.model('Link', LinkSchema);

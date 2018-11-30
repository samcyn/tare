const mongoose = require('mongoose');

const { Schema } = mongoose;

const VoteSchema = new Schema({
  link: {
    type: Schema.Types.ObjectId,
    ref: 'Link',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});


module.exports = mongoose.model('Vote', VoteSchema);

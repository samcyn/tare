/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Recipe',
  },

});

UserSchema.pre('save', function userSChema(next) {
  if (!this.isModified('password')) {
    return next();
  }
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    return bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) { return next(error); }
      this.password = hash;
      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);

/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

// Other oauthtypes to be added

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  tokens: Array,
  profile: {
    displayName: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    gender: { type: String, default: null },
    birthday: { type: String, default: null },
    location: { type: String, default: null },
    website: { type: String, default: null },
    picture: { type: String, default: null }
  },
  socionicType: { type: Object, default: { intrivert: null, ratio: null, logic: null, intuit: null }},
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: {},
  facebook: { type: String, unique: true }
});

function encryptPassword(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt(5, (saltErr, salt) => {
    if (saltErr) return next(saltErr);
    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash;
      return next();
    });
  });
}

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword);

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  }
};

/**
 * Statics
 */

UserSchema.statics = {};

export default mongoose.model('User', UserSchema);

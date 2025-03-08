const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo:{
    type: String,
    default: 'default.jpg',
    required: [true, 'Please provide your photo']
  },
  emailVerify: {
    type: Boolean,
    default: false
  },
  phoneNo: {
    type: String,
    default: null
  },
  phoneVerify: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      }
    },
    select: false
  },
  address: {
    type: Object,
    default: null
  },
  resume: {
   type: Object,
    default: null
  },  

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  favouriteJobs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Job'
    }
  ],
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  // Forign key
  companies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Company'
    }
  ],
  // Forign key
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });


// virtual populate
userSchema.virtual('applications', {
  ref: 'Application',
  foreignField: 'user',
  localField: '_id'
});

// reviews
userSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'user',
  localField: '_id'
});

// reviews
userSchema.virtual('followings', {
  ref: 'Company',
  foreignField: 'followers',
  localField: '_id'
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field---
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// correctPassword is an instance method
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// reset password token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};





// Export the model
module.exports = mongoose.model('User', userSchema);

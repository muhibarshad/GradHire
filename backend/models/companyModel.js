  const mongoose = require('mongoose');

  const CompanySchema = new mongoose.Schema({
    photo  : {
      type: String,
      default: 'default.jpg'
    },
    name: {
      type: String,
      required: [true, 'Please enter Company name'],
    },
    headName: {
      type: String,
      required: [true, 'Please enter Head name']
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      // unique: true
    },
    website: {
      type: String,
      required: [true, 'Please enter website'],
    },
    
  
    phone: {
      type: String,
      required: [true, 'Please enter phone']
    },
    address: {
      type: String,
      required: [true, 'Please enter address']
    },
    establishedSince: {
      type: String,
      required: [true, 'Please fill out this field']
    },
    type: {
      type: String,
      required: [true, 'Please provide Organization type for the job'],
      enum: ['Public', 'Private', 'Self Employed', 'Government']
    },
    size: {
      type: Number,
      required: [true, 'Please enter Organization Size']
    },
    industry: {
      type: String,
      required: [true, 'Please enter Industry'],
      enum: ['IT', 'Finance', 'Education', 'Health', 'Agriculture', 'Manufacturing', 'Construction', 'Transportation', 'Other'] 
    },
    description: {
      type: String,
      required: [true, 'Please provide company description']
    },
    socialLinks: [
      {
        urlType: {
          type: String,
          required: [true, 'Please provide social link type'],
          enum: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'Youtube', 'Other']
        },
        url: {
          type: String,
          required: [true, 'Please provide social link']
        }
      } 
    ],


    // forign key
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],

  });

  // virtual populate
  CompanySchema.virtual('jobs', {
    ref: 'Job',
    foreignField: 'company',
    localField: '_id'
  });

  // virtual populate
  CompanySchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'company',
    localField: '_id'
  });

  // find middleware



  // Export the model
  module.exports = mongoose.model('Company', CompanySchema);

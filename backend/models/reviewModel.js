const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    company : {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
    },
    title: {
        type: String,
        required: [true, 'Please provide a title for the review']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the review']
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a rating for the review'],
        min: 1,
        max: 5
    },
    pros :String,
    cons :String,
    upvotes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
        
    ],
    downvotes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }

    ],  
    response : {
        type: String,
        default: ''
    },
    responseDate : {
        type: Date,
        default: Date.now()
    },
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});



// find pre middleware
reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name email'
    },    
    ).lean()
    next();
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
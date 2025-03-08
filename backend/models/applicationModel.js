const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.ObjectId,
        ref: 'Job',
        required: [true, 'Please provide a job for the application']
    },
    user: {
        type:   mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user for the application']   
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'In Progress', 'Email Sent']        , // 'In Progress', 'Completed
        default: 'Pending'
    },
    testResult: {
        type:Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    bookmarked: {
        type: Boolean,
        default: false
    }
});

// virtual populate
applicationSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'job',
        select: 'title description'
    }).populate({
        path: 'user',
        select: 'name email'
    });
    next();
});


const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
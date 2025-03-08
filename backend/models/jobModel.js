const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the job']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the job']
    },
    location: {
        type: String,
        required: [true, 'Please provide a location for the job']
    },
    salaryRange: {
        type: String,
        default: 'Not Disclosed'
    },
    mode : {
        type: String,
        required: [true, 'Please provide a mode for the job'],
        enum: ['Remote', 'Onsite', 'Hybrid' ]
    },
    type: {
        type: String,
        required: [true, 'Please provide a type for the job'],
        enum: ['Full Time', 'Part Time', 'Contract', 'Internship', 'Other' ]
    },
    skills: {
        type: [String],
        required: [true, 'Please provide skills for the job'],
        default: []
    },
    	
    datePosted:{
        type: Date,
        default: Date.now()
    },

    // make it sync with length of applications
    noOfApplicants: {
        type: Number,
        default: 0
    },
    noOfClicks: {
        type: Number,
        default: 0
    },

    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: [true, 'Please provide a company for the job']
    },
    haveTest: {
        type: Boolean,
        default: false
    },
    // Next Part is for the test of this job
    test: {
        title: {
            type: String,
         
        },
        description: {
            type: String,
            
        },
        time: {
            type: Number,
        },
        noOfQuestions: {
            type: Number,
        },
        passingPercentage: {
            type: Number,
        },
        testInstructions: {
            type: String,
        },
        questions: [
            {
                question: {
                    type: String,
                },
                options: {
                    type: [String],
                },
                answer: {
                    type: String,
                }
            }

        ]
    }
            
});

// virtual populate
jobSchema.virtual('applications', {
    ref: 'Application',
    foreignField: 'job',
    localField: '_id'
});




const Job = mongoose.model('Job', jobSchema);
module.exports = Job;

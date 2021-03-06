const mongoose = require("mongoose");

//New schema for storing jobs
const jobSchema = new mongoose.Schema({
    jobName: {
        type: String,
        required: true
    },
    jobDesc: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    jobDate: {
        type: Date,
        default: Date.now()
    }
    
    //Below is temporarily commented for testing
    // },
    // jobCreator: {
    //     type: String,
    //     required: true
    // },
    // jobMembers: {
    //     type: Array,
    //     required: true
    // }
})

//Investigate the following command under bookmarked page
const Job = mongoose.model("Job", jobSchema, "jobCollection");

module.exports = Job;

//I have to figure out the specifics on multiple models per collection or if I want to split up connections into two




const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
    jobTitle: {type: String, default: ''},
    location: {type: String, default: ''},
    salary: {type: String, default: ''},
    education: {type: String, default: ''},
    experience: {type: String, default: ''},
    hr: {type: String, default: ''},
    description: {type: String, default: ''},
    tags: {type: String, default: ''}
});

// 再编译成模型
const Job = mongoose.model('job', jobSchema);

module.exports = Job;


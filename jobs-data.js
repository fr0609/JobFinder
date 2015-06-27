var mongoose = require("mongoose");
var Promise = require("bluebird");
var jobModel = require("./models/Job");
var Job = mongoose.model('Job');


var jobs = [{
    title: 'Cook',
    description: 'You will be making bagels'
}, {
    title: 'Professional Dancer',
    description: 'You will be dancing ballet'
}, {
    title: 'Angular Developer',
    description: 'You will be doing great stuff'
}];


var findJobs = function(query){
    return Promise.cast(mongoose.model('Job').find(query).exec());
}
var createJob = Promise.promisify(Job.create, Job);

exports.findJobs  = findJobs;
exports.connectDB = Promise.promisify(mongoose.connect, mongoose);
exports.saveJob = createJob;


exports.seedJobs = function() {
        return findJobs({}).then(function(collection) {
            if (collection.length === 0) {
                return Promise.map(jobs, function(job){
                    return createJob(job);
                });
            }
        });

}
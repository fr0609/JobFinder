var expect = require("chai").expect;
var mongoose = require("mongoose");
var Promise = require("bluebird");
var jobsData = require("../../jobs-data.js");

function resetJobs() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe("get jobs", function() {
    var jobsList;
    before(function(done) {
        jobsData.connectDB('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function(collections) {
                jobsList = collections;
                done();
            });
    })
    after(function() {
        mongoose.connection.close();
    });
    it("should never be empty since jobs are seeded", function() {
        expect(jobsList.length).to.be.at.least(1);

    });

    it('should have a job with a title', function() {
        expect(jobsList[0].title).to.not.be.empty;
    });

    it('should have a job with a description', function() {
        expect(jobsList[0].description).to.not.be.empty;
    });
  });

    describe("db save jobs", function() {
        var job = {
            title: "cook",
            description: "You will be making begels"
        };
        var jobs;

        function saveTestJob() {
            return JobsData.saveJob(job);
        }


        before(function(done) {
            jobsData.connectDB('mongodb://localhost/jobfinder')
            .then(resetJobs)
                .then(function() {
                    return jobsData.saveJob(job)
                })
                .then(jobsData.findJobs)
                .then(jobsData.findJobs)
                .then(function setJobs(collections) {
                    jobsList = collections;
                    done();
                });
        })
        
        after(function() {
            mongoose.connection.close();
        })
        it('it should have a job after saving it', function() {
            expect(jobsList).to.have.length(1);
        });

    });

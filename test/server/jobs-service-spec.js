var express = require("express");
var app = express();
var expect = require("chai").expect;
var request = require("supertest");
var Promise = require('bluebird');

var dataSavedJob;


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


var db = {
    saveJob: function(job){
        dataSavedJob = job;
    },
    findJobs: function(){
        return new Promise(function(resolve, reject){
           resolve(["Hi"]); 
        });
    }
    
};
var jobService = require("../../jobs-service")(db, app);


describe("save jobs",  function(){
    
    it("should validate that title is greaten than 4 characters"); 
    it("should validate that title is less than 40 characters");
    it("should validate that description is greaten than 4 characters"); 
    it("should validate that description is less than 255 characters");

    var newJob = { title: 'Cook',description: 'You will be making bagels'};
    it("should pass the job to the database save",function(done){
        request(app).post('/api/jobs').send(newJob).end(function(err,res){
            expect(dataSavedJob).to.deep.equal(newJob);
            done();
        })
        
    });
    it("should return a status of 200 to the front end if the database save");
    it("should return a job with an id",  function(done) {
       request(app).get('/api/jobs').
       expect('Content-Type', /json/)
       .end(function(err, res){
                expect(res.body).to.be.a('Array');
                done();
         });
    });
    it("should return an error if the database failed");
});
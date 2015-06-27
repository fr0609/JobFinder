describe('posting jobs', function(){


    var postRequest;
    var newJob = {title: 'test title', description: 'test description'};
    beforeEach(module('app'));
    
    
    it('should call /api/jobs with job data', inject(function($httpBackend, jobs){
        $httpBackend.whenPOST('/api/jobs', function(data){
            postRequest= JSON.parse(data);
             expect(postRequest).to.not.be.empty;
             return true;
        }).respond(200);
        jobs.save(newJob);
        $httpBackend.flush;
    }));
});
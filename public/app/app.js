app = angular.module('app', ['ngResource']);

angular.module('app').controller('testCtrl', function($scope, $resource, jobs) {
    $scope.jobs = $resource('/api/jobs').query();
    
    $scope.submit = function () {
     var job = {title: $scope.title, description: $scope.description};
       jobs.save(job);
       $scope.jobs.push(job);
    }
});
angular.module('activities').controller('ActivityListController', function($scope, activityService) {

    $scope.activites = activityService.get();


    $scope.$on('AddActivity', function(event, data) {
        console.log("test");
        //$scope.activites.push(data);
        activityService.add(data);
        $scope.$emit('onSuccess', data);

    });

});
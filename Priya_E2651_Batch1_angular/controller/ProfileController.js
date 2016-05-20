 angular.module('profile').controller('ProfileController', function($rootScope, $scope, employeeFactory, $location, $stateParams) {
     $scope.currentEmployee = employeeFactory.sharedProfile;
     $scope.id = $stateParams.empId;
     console.log($scope.id);
     $scope.update = function(e) {
         if (employeeFactory.update(e)) {
             //init();
             $rootScope.acitvities.push("Update the profile of" + e.name);

         }
     }

     function init() {
         $scope.currentEmployee = "";
     }
 });
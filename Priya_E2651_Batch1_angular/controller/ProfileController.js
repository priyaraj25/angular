 angular.module('profile').controller('ProfileController', function($rootScope, $scope, employeeFactory, $location, $stateParams,$window) {
     $scope.currentEmployee = employeeFactory.sharedProfile;
	 $scope.pemployee ={};
	 angular.copy($scope.currentEmployee,$scope.pemployee);
	 
	 
	 
     $scope.id = $stateParams.empId;
     console.log($scope.id);
     $scope.update = function(e) {
         if (employeeFactory.update(e)) {
             //init();
             $rootScope.acitvities.push("Update the profile of" + e.name);
             $window.history.back(); 
         }
     }

     function init() {
         $scope.currentEmployee = "";
     }
	 
	 $scope.$watch('currentEmployee', function() {
  
     if (angular.equals($scope.currentEmployee, $scope.pemployee)) {
        $scope.buttonDisabled = true;
    } else {
        $scope.buttonDisabled = false;
    }
}, true);
	 
 });
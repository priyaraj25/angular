 angular.module('login').controller('loginController', function($scope, $location, employeeFactory, $state) {

     $scope.login = function() {
         $state.go('employee', {
             username: $scope.username
         });
     };

 });
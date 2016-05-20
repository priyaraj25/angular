angular.module('mainApp').directive('employeeAddDirective', function() {
  return {
    restrict: 'E',
	
    scope: {
      addOrUpdate: "&addOrUpdate",
      employeeInfo: '=info',
	  btn: '@'
	  
    },
    templateUrl: "directive/employeeAddDirective.html"
	
    //template: '<h3>{{e.name +  " woking as a " + e.role + " in a project " + e.project.name + " at " + e.project.location}}. <button ng-click ="delete(e)" >Delete</button><button ng-click ="seeProfile(e)" >See Profile</button></h3>'
  }
});
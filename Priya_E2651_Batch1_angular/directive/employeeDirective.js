angular.module('mainApp').directive('employeeDirective', function($timeout){


  return {
	// templateUrl: "directive/employeeDirective.html"
  template: '<h3 style="{{appendColor}}">{{e | myFilter }} <button ng-click ="delete(e)" >Delete</button> <button ng-click ="seeProfile(e)" >SeeProfile</button>	</h3>',

  link: function($scope,element){
    $scope.appendColor = 'color:black;';
    $timeout(function(){
      $scope.appendColor="";
    }, 3000);

  }
};
});

//templateUrl

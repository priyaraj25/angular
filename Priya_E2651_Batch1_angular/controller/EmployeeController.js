 angular.module('employee').controller('EmployeeController', function($rootScope, $scope, employeeFactory, $location, $stateParams, $state) {

     $scope.username = $stateParams.username;
     $rootScope.empId = "E2651";
     $rootScope.acitvities = [];
     $scope.haslistUpdated = false;
     init();
     /*
   $scope.employees=[
     {
       name:'John', role:'Softwate Engineer',
       project : { project_name : 'x', project_location : 'xy' }
     },
     {
       name:'Mark',role: 'PM',
       project : { project_name : 'y', project_location : 'yz' }
     },
     {
       name:'Bill',role:'QA',
       project : { project_name : 'z', project_location : 'za' }
     },
   ];
*/

     $scope.employees = employeeFactory.employees;
     console.log($scope.employees);


     $scope.$watch(function() {
         return $scope.employees.length;

     }, function(newVal, oldVal) {
         if (newVal !== oldVal) {
             if (newVal > oldVal) {
                 alert("Added a employee successfully");
             } else {
                 alert("Removed a employee successfully");
             }
         }
     });

     $scope.$watch('haslistUpdated', function() {
         //alert('list updated');
     });


     $scope.addemployee = function() {
         var newEmployee = {
             id: $scope.employees.length + 1,
             name: $scope.emp.name,
             role: $scope.emp.role,
             project: $scope.emp.project
         };
         employeeFactory.addEmp(newEmployee);
         //$scope.employees.push(newEmployee);
         haslistUpdated = false;
         $scope.$broadcast('AddActivity', "Added new emp " + newEmployee.name);
         init();
     };

     $scope.$on('onSuccess', function(event, data) {

         console.log("Added Successfully", data);

     });

     $scope.delete = function(empl) {
         $scope.$broadcast('AddActivity', "Deleted " + empl.name);
         employeeFactory.delEmp(empl);
     };

     $scope.seeProfile = function(currentEmployee) {

         // $rootScope.acitvities.push("See the profile of " + currentEmployee.name);
         employeeFactory.updateSharedProfile(currentEmployee);
         $state.go('profile', {
             empId: currentEmployee.id
         });

     }



     //$scope.seeProfile($scope.employees[0]);

     function init() {
         /* $scope.name = "";
          $scope.role = "";
          $scope.project = {
            project_name: "",
            project_location: ""
          } */
         $scope.emp = "";
     };

     $scope.myClick = function($event) {
         if ($event === true) {
             $scope.comparatorFunction = function(name, search) {
                 return ('' + name).indexOf('' + search) > -1;
             };
         } else {
             $scope.comparatorFunction = function(name, search) {
                 var itemNameLower = name.toLowerCase();
                 var itemSearchLower = search.toLowerCase();
                 return (itemNameLower).indexOf(itemSearchLower) > -1;
             };
         }
     }

 });



 angular.module('employee').factory('employeeFactory', function() {
     var emplist = [{
         id: 1,
         name: 'John',
         role: 'Software Engineer',
         project: {
             project_name: 'xxx',
             project_location: 'chennai'
         }
     }, {
         id: 2,
         name: 'Mark',
         role: 'PM',
         project: {
             project_name: 'yyyy',
             project_location: 'bglore'
         }
     }, {
         id: 3,
         name: 'Bill',
         role: 'QA',
         project: {
             project_name: 'zzzz',
             project_location: 'ITPL'
         }
     }, ];
     return {
         sharedProfile: {
             id: "0000",
             name: "x",
             role: "y",
             project: {
                 project_name: "xy",
                 project_location: "xyz"
             }
         },
         employees: emplist,
         addEmp(e) {

             var flag = false;

			 if(e.project_name == null || e.project_location == null){
				 e.project_name = "TBD";
				 e.project_location = "TBD";
				 
			 }
			 
			 
             var emplength = emplist.length;
             for (var i = 0; i < emplength; i++) {
                 if (emplist[i].name.toLowerCase() === e.name.toLowerCase()) {
                     alert("Existing User");
					
                     flag = true;
                     break;
                 }

             }

             if (!flag) {
                 emplist.push(e);
             }
         },
         delEmp(e) {
             var index = emplist.indexOf(e);
             emplist.splice(index, 1);
         },
         update(e) {
             console.log(e);
             var emplength = emplist.length;
             for (var i = 0; i < emplength; i++) {
                 if (emplist[i].id === e.id) {
                     //$rootScope.acitvities.push(e);
                     emplist[i].name = e.name;
                     emplist[i].role = e.role;
                     emplist[i].project = e.project;
                     emplist[i].project_location = e.project_location;
                     return true;
                 }
             }
             console.log(emplist);
             return false;
         },

         updateSharedProfile(newEmp) {
             this.sharedProfile.id = newEmp.id;
             this.sharedProfile.name = newEmp.name;
             this.sharedProfile.role = newEmp.role;
             this.sharedProfile.project = newEmp.project;
         }
     };
 });


 angular.module('employee').filter('myFilter', function() {
     return function(emp) {
		  var i;
		if(emp.project == null || emp.project.project_name == null  || emp.project.project_location ==null){
          i = "Employee Id :" + emp.id + " -> " + emp.name + "'s role is " + emp.role + "	working in	" + "TBD" + "	at	" + "TBD";         
		}else{
          i = "Employee Id :" + emp.id + " -> " + emp.name + "'s role is " + emp.role + "	working in	" + emp.project.project_name + "	at	" + emp.project.project_location;
		}
		 return i;
     };
 });


 angular.module('mainApp').filter('wordsFilter', function() {
     return function(emp, search) {
         var filtered = [];

         angular.forEach(emp, function(name) {
             if (name.toString().indexOf(search) !== -1) {
                 filtered.push(name);
             }
         });


         return filtered;
     };
 });



 angular.module('mainApp').service('activityService', function() {

     var activities = [];

     this.add = function(e) {
         activities.push(e);
     }

     this.get = function() {
         return activities;
     }


 });
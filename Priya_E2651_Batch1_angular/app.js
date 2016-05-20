angular.module("login", []);
angular.module("employee", ["activities"]);
angular.module("profile", []);
angular.module("activities", []);



var newApp = angular.module("mainApp", ["ui.router", "login", "employee", "profile"]);
newApp.config(function($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginController'
        })
        .state('employee', {
            url: '/employee?username',
            templateUrl: 'templates/employee_list.html',
            controller: 'EmployeeController'
        })
        //.state('employee.activities', {
        //   url: '/activities',
        //templateUrl: 'templates/activity.html',
        //controller: 'ActivityListController'
        //})
        .state('profile', {
            url: '/profile/:empId',
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController'
        })

});
'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'ctrl'
]);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/screen-1', {
    templateUrl: 'views/screen-1.html',
  });
  $routeProvider.when('/screen-2', {
    templateUrl: 'views/screen-2.html',
  });
  $routeProvider.when('/screen-3', {
    templateUrl: 'views/screen-3.html',
  });
  $routeProvider.when('/screen-4', {
    templateUrl: 'views/screen-4.html',
  });
  $routeProvider.when('/screen-5', {
    templateUrl: 'views/screen-5.html',
  });
  $routeProvider.otherwise({
    redirectTo : '/screen-1'
  });
}]);
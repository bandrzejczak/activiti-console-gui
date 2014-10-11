'use strict';

/**
 * @ngdoc overview
 * @name activitiConsoleApp
 * @description
 * # activitiConsoleApp
 *
 * Main module of the application.
 */
angular
  .module('activitiConsoleApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/task', {
        templateUrl: 'views/task.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .value('language', {
    supported: ['en', 'pl'],
    default: 'en'
  })
  .value('RESTApiURL', 'http://localhost:8080/')
  .run(function ($http, $cookies) {
        if($cookies.Authorization)
            $http.defaults.headers.common.Authorization = $cookies.Authorization;
  });
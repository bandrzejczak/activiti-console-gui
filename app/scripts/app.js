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
    'ui.router',
    'ngSanitize'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('root', {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      });
  })
  .value('language', {
    supported: ['en', 'pl'],
    default: 'en'
  })
  .value('RESTApiURL', 'http://localhost:8080/');
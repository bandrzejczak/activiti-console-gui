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
        'ngAnimate',
        'ngSanitize'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('main', {
                templateUrl: 'views/mainLayout.html'
            })
            .state('main.root', {
                url: '/',
                templateUrl: 'views/home.html'
            });
    })
    .value('language', {
        supported: ['en', 'pl'],
        default: 'en'
    })
    .value('RESTApiURL', 'http://localhost:7000/')
    .value('loginTimeout', 30); // in minutes
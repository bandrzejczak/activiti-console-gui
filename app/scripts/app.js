'use strict';

/**
 * @ngdoc overview
 * @name bpmConsoleApp
 * @description
 * # bpmConsoleApp
 *
 * Main module of the application.
 */
angular
    .module('bpmConsoleApp', [
        'ngCookies',
        'ngResource',
        'ui.router',
        'ui.bootstrap.dropdown',
        'ngAnimate',
        'ngSanitize',
        'oitozero.ngSweetAlert'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/tasks/inbox');

        var testController = function($scope, $http){
            $scope.success = function(){
                $http.post('api/deployment', $scope.file);
            };
        };

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('app', {
                abstract: true,
                templateUrl: 'views/mainLayout.html',
                controller: function($scope, $state){
                    $scope.stateIncludes = function(name){
                        return $state.includes('app.'+name+'.*');
                    };
                }
            })
            .state('app.tasks', {
                abstract: true,
                template: '<ui-view/>',
                url: '/tasks'
            })
            .state('app.tasks.inbox', {
                url: '/inbox',
                templateUrl: 'views/home.html',
                controller: testController
            })
            .state('app.tasks.awaiting', {
                url: '/awaiting',
                templateUrl: 'views/home.html',
                controller: testController
            })
            .state('app.deployments', {
                abstract: true,
                template: '<ui-view/>',
                url: '/deployments'
            })
            .state('app.deployments.add', {
                url: '/add',
                templateUrl: 'views/home.html',
                controller: testController
            })
            .state('app.deployments.list', {
                url: '/list',
                templateUrl: 'views/home.html',
                controller: testController
            })
            .state('app.processes', {
                url: '/processes',
                templateUrl: 'views/home.html',
                controller: testController
            })
            .state('app.users', {
                abstract: true,
                template: '<ui-view/>',
                url: '/users'
            })
            .state('app.users.add', {
                url: '/add',
                templateUrl: 'views/home.html',
                controller: testController
            })
            .state('app.users.list', {
                url: '/list',
                templateUrl: 'views/home.html',
                controller: testController
            })
            .state('app.groups', {
                abstract: true,
                template: '<ui-view/>',
                url: '/groups'
            })
            .state('app.groups.add', {
                url: '/add',
                templateUrl: 'views/home.html',
                controller: testController
            })
            .state('app.groups.list', {
                url: '/list',
                templateUrl: 'views/home.html',
                controller: testController
            });
    })
    .value('language', {
        supported: ['en', 'pl'],
        default: 'en'
    })
    .value('RESTApiURL', 'http://localhost:7000/')
    .value('loginTimeout', 30); // in minutes

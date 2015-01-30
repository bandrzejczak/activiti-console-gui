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
        'ui.bootstrap',
        'ngAnimate',
        'ngSanitize',
        'oitozero.ngSweetAlert',
        'angular-loading-bar',
        'ngTable'
    ])
    .config(function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
        $urlRouterProvider.otherwise('/tasks/inbox');

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
                template: '<ui-view></ui-view>',
                url: '/tasks'
            })
            .state('app.tasks.inbox', {
                url: '/inbox',
                templateUrl: '../views/tasks.html',
                controller: 'TasksCtrl',
                type: 'inbox'
            })
            .state('app.tasks.awaiting', {
                url: '/awaiting',
                templateUrl: '../views/tasks.html',
                controller: 'TasksCtrl',
                type: 'awaiting'
            })
            .state('app.tasks.task', {
                url: '/:id',
                templateUrl: '../views/task.html',
                controller: 'TaskCtrl'
            })
            .state('app.processes', {
                url: '/processes',
                templateUrl: '../views/processes.html',
                controller: 'ProcessesCtrl'
            })
            .state('app.deployments', {
                abstract: true,
                template: '<ui-view></ui-view>',
                url: '/deployments'
            })
            .state('app.deployments.add', {
                url: '/add',
                templateUrl: 'views/deployment.add.html',
                controller: 'AddDeploymentCtrl'
            })
            .state('app.deployments.list', {
                url: '/list',
                templateUrl: 'views/deployment.list.html',
                controller: 'ListDeploymentsCtrl'
            })
            .state('app.instances', {
                url: '/instances',
                templateUrl: 'views/instances.html',
                controller: 'InstancesCtrl'
            })
            .state('app.users', {
                abstract: true,
                template: '<ui-view></ui-view>',
                url: '/users'
            })
            .state('app.users.add', {
                url: '/add',
                templateUrl: 'views/lipsum.html'
            })
            .state('app.users.edit', {
                url: '/edit/:id',
                templateUrl: 'views/lipsum.html'
            })
            .state('app.users.list', {
                url: '/list',
                templateUrl: 'views/users.list.html',
                controller: 'ListUsersCtrl'
            })
            .state('app.groups', {
                abstract: true,
                template: '<ui-view></ui-view>',
                url: '/groups'
            })
            .state('app.groups.add', {
                url: '/add',
                templateUrl: 'views/lipsum.html'
            })
            .state('app.groups.edit', {
                url: '/edit/:id',
                templateUrl: 'views/lipsum.html'
            })
            .state('app.groups.list', {
                url: '/list',
                templateUrl: 'views/groups.list.html',
                controller: 'ListGroupsCtrl'
            });

        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.latencyThreshold = 0;
    })
    .value('language', {
        supported: ['en', 'pl'],
        default: 'en'
    })
    .value('RESTApiURL', 'http://localhost:7000/')
    .value('loginTimeout', 30); // in minutes

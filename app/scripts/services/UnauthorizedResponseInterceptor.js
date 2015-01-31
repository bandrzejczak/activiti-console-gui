'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.UnauthorizedResponseInterceptor
 * @description
 * # UnauthorizedResponseInterceptor
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('UnauthorizedResponseInterceptor', ['$q', '$location', function ($q, $location) {
        return {
            'responseError': function (rejection) {
                if (rejection.status === 401) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('UnauthorizedResponseInterceptor');
    }]);
'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.UnauthorizedResponseInterceptor
 * @description
 * # UnauthorizedResponseInterceptor
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('ServerErrorInterceptor', function ($q, $rootScope) {


        return {
            'responseError': function (rejection) {
                if (rejection.status === 500 || (rejection.data && rejection.data.errorClass)) {
                    $rootScope.$emit('exception', rejection.data);
                }
                return $q.reject(rejection);
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('ServerErrorInterceptor');
    });
'use strict';

/**
 * @ngdoc service
 * @name activitiConsoleApp.UnauthorizedResponseInterceptor
 * @description
 * # UnauthorizedResponseInterceptor
 * Service in the activitiConsoleApp.
 */
angular.module('activitiConsoleApp')
  .factory('UnauthorizedResponseInterceptor', function($q, $location) {
    return {
        'responseError': function(rejection) {
            if(rejection.status == 401)
                $location.path("/login");
            return $q.reject(rejection);
        }
    };
  });
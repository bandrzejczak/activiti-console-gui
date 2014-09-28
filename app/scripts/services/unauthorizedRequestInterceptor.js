'use strict';

/**
 * @ngdoc service
 * @name activitiConsoleApp.unauthorizedRequestInterceptor
 * @description
 * # unauthorizedRequestInterceptor
 * Service in the activitiConsoleApp.
 */
angular.module('activitiConsoleApp')
  .factory('unauthorizedRequestInterceptor', function($q, $location) {
    return {

        /** na cele testowe **/
        'response': function(response) {
            console.log("Success with status "+response.status);
            return response;
        },
        /** na cele testowe - koniec **/

        'responseError': function(rejection) {
            if(rejection.status == 401)
                $location.path("/login");
            return $q.reject(rejection);
        }
    };
  });
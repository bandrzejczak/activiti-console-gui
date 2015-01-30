'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Users
 * @description
 * # Users
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('Users', function ($resource) {
        return $resource('api/users', {}, {});
    });

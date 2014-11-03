'use strict';

/**
 * @ngdoc service
 * @name activitiConsoleApp.Messages
 * @description
 * # Messages
 * Service in the activitiConsoleApp.
 */
angular.module('activitiConsoleApp')
    .factory('Groups', function ($resource) {
        return $resource('api/groups', {}, {});
    });

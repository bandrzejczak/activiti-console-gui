'use strict';

/**
 * @ngdoc service
 * @name activitiConsoleApp.Messages
 * @description
 * # Messages
 * Service in the activitiConsoleApp.
 */
angular.module('activitiConsoleApp')
    .factory('Messages', function ($resource) {
        return $resource('messages/:lang/:packageName.json', {}, {});
    });

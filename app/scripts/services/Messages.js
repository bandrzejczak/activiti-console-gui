'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Messages
 * @description
 * # Messages
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('Messages', ['$resource', function ($resource) {
        return $resource('messages/:lang/:packageName.json', {}, {});
    }]);

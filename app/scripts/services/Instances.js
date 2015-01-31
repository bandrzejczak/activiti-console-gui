'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Instances
 * @description
 * # Instances
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('Instances', ['$resource', function ($resource) {
        return $resource('api/instances', {}, {});
    }]
);

'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Deployments
 * @description
 * # Deployments
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('Deployments', ['$resource', function ($resource) {
        return $resource('api/deployments', {}, {});
    }]);

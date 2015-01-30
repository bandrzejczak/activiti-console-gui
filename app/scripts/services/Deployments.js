'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Deployments
 * @description
 * # Deployments
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('Deployments', function ($resource) {
        return $resource('api/deployments', {}, {});
    });

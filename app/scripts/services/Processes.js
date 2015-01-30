'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Processes
 * @description
 * # Processes
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('Processes', function ($resource) {
        return $resource(
            'api/processes/:id/:action',
            {'id': '@id'},
            {
                start: {method: 'POST', params: {action: 'start'}}
            });
    });

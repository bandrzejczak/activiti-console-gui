'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Messages
 * @description
 * # Messages
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('Tasks', function ($resource) {
        return $resource(
            'api/tasks/:type/:action',
            {'type': '@type'},
            {
                claim: {method: 'POST', params: {action: 'claim'}},
                form: {method: 'GET', params: {action: 'form'}}
            });
    });

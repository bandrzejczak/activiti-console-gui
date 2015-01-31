'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Tasks
 * @description
 * # Tasks
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('Tasks', ['$resource', function ($resource) {
        return $resource(
            'api/tasks/:type/:action',
            {'type': '@type'},
            {
                form: {method: 'GET', params: {action: 'form'}},
                claim: {method: 'POST', params: {action: 'claim'}},
                unclaim: {method: 'POST', params: {action: 'unclaim'}},
                submit: {method: 'POST', params: {action: 'submit'}}
            });
    }]
);

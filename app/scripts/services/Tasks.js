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
                form: {method: 'GET', params: {action: 'form'}},
                claim: {method: 'POST', params: {action: 'claim'}},
                unclaim: {method: 'POST', params: {action: 'unclaim'}},
                submit: {method: 'POST', params: {action: 'submit'}}
            });
    });

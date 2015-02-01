'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Users
 * @description
 * # Users
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('Users', ['$resource', function ($resource) {
        return $resource(
            'api/users/:id/:action',
            {
                'id': '@id',
                'action': '@action'
            },
            {
                'groups': {method: 'GET', params: {action: 'groups'}},
                'create': {method: 'POST'},
                'update': {method: 'PUT'},
                'delete': {method: 'DELETE'}
            });
    }]);

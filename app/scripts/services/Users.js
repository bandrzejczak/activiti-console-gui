'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Users
 * @description
 * # Users
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('Users', function ($resource) {
        return $resource(
            'api/users/:id/:action',
            {
                'id': '@id',
                'action': '@action'
            },
            {
                'groups': {method: 'GET', params: {action: 'groups'}}
            });
    });

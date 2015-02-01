'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Messages
 * @description
 * # Messages
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('Groups', ['$resource', function ($resource) {
        return $resource(
            'api/groups/:groupId/:action/:userId',
            {
                'groupId': '@groupId',
                'action': '@action',
                'userId': '@userId'
            },
            {
                'createAssignment': {method: 'POST', params: {action: 'members'}},
                'removeAssignment': {method: 'DELETE', params: {action: 'members'}},
                'create': {method: 'POST'},
                'update': {method: 'PUT'},
                'delete': {method: 'DELETE'}
            });
    }]);

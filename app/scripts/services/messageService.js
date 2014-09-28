'use strict';

/**
 * @ngdoc service
 * @name activitiConsoleApp.messageService
 * @description
 * # Utilservice
 * Service in the activitiConsoleApp.
 */
angular.module('activitiConsoleApp')
  .factory('messageService', function ($resource) {
        return $resource('messages/:lang/:packageName.json',
            {packageName: '@packageName', lang: '@lang'}, {});
  });

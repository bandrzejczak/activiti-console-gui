'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.RESTApiURLSetter
 * @description
 * # RESTApiURLSetter
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('RESTApiURLSetter', ['RESTApiURL', function (RESTApiURL) {
        return {
            'request': function (config) {
                if (config.url.substring(0, 4) === 'api/') {
                    config.url = RESTApiURL + config.url.substring(4);
                }
                return config;
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('RESTApiURLSetter');
    }]);

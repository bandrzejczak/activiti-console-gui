'use strict';

/**
 * @ngdoc service
 * @name activitiConsoleApp.RESTApiURLSetter
 * @description
 * # RESTApiURLSetter
 * Service in the activitiConsoleApp.
 */
angular.module('activitiConsoleApp')
  .factory('RESTApiURLSetter', function(RESTApiURL) {
        return {
            'request': function(config) {
                if(_.startsWith(config.url, "api/"))
                    config.url = RESTApiURL + config.url.substring(4);
                return config;
            }
        };
    });

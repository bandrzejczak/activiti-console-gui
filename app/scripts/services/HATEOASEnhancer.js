'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.HATEOASEnhancer
 * @description
 * # HATEOASEnhancer
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('HATEOASEnhancer', ['ResourceLinkBuilder', 'RESTApiURL', function (ResourceLinkBuilder, RESTApiURL) {
        return {
            'response': function (response) {
                if(response.config.url.indexOf(RESTApiURL) === 0) {
                    var links = response.headers('Link');
                    var newData = {
                        response: response.data
                    };
                    if (links !== null)
                        newData.links = ResourceLinkBuilder.fromHeader(links);
                    response.data = newData;
                }
                return response;
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('HATEOASEnhancer');
    }]);
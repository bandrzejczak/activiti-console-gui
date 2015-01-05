'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.ResourceLinkBuilder
 * @description
 * # ResourceLinkBuilder
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('ResourceLinkBuilder', function ($injector) {

        var pathPattern = /<(.*?)>/;
        var relPattern = /rel="(.*?)"/;
        var actionsPattern = /actions="(.*?)"$/;

        function getHeaderRel(header){
            return relPattern.exec(header)[1];
        }

        function createLinkResource(header){
            var path = 'api' + pathPattern.exec(header)[1];
            var actions = (actionsPattern.exec(header)[1]).replace(/'/g, '"');
            var $resource = $injector.get('$resource');
            return $resource(path, {}, transformResourceActions(JSON.parse(actions)));
        }

        function transformResourceActions(actions){
            var actionsObject = {};
            for(var i=0; i<actions.length; i++) {
                var action = actions[i];
                actionsObject[action.name] = {
                    method: action.method
                };
            }
            return actionsObject;
        }

        return {
            'fromHeader': function(headerText) {
                var headersArray = headerText.split(', ');
                var links = {};
                for(var i=0; i<headersArray.length; i++) {
                    var header = headersArray[i];
                    links[getHeaderRel(header)] = createLinkResource(header);
                }
                return links;
            }
        };
    });
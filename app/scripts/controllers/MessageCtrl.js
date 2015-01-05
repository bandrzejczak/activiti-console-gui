'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:MessageCtrl
 * @description
 * # MessageCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('MessageCtrl', function ($rootScope, $state, $window, language, Messages) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            var newLocation = getLocationBasePath($state.href(toState));
            if (!$rootScope.msg[newLocation]) {
                fetchMessages(newLocation);
            }
        });

        function fetchMessages(newLocation) {
            $rootScope.msg[newLocation] = Messages.get({
                packageName: newLocation,
                lang: $rootScope.lang
            });
        }

        function setApplicationLanguage() {
            var lang = $window.navigator.userLanguage || $window.navigator.language;
            lang = lang.toLowerCase();
            if (language.supported.indexOf(lang) === -1) {
                lang = language.default;
            }
            $rootScope.lang = lang;
        }

        function getLocationBasePath(path) {
            path = path.substr(path.indexOf('/')+1);
            if (path.length === 0) {
                return 'base';
            }
            var firstSlash = path.indexOf('/');
            firstSlash = (firstSlash === -1 ? path.length : firstSlash);
            return path.substr(0, firstSlash);
        }

        setApplicationLanguage();

        $rootScope.msg = {
            base: Messages.get({
                packageName: 'base',
                lang: $rootScope.lang
            })
        };
    });
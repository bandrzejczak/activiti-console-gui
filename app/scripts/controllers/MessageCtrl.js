'use strict';

/**
 * @ngdoc function
 * @name activitiConsoleApp.controller:MessageCtrl
 * @description
 * # MessageCtrl
 * Controller of the activitiConsoleApp
 */
angular.module('activitiConsoleApp')
  .controller('MessageCtrl', function ($scope, $location, $window, language, Messages) {
    setApplicationLanguage();
    $scope.msg = {
        base:   Messages.get({
                    packageName: 'base',
                    lang: $scope.lang
                })
    };

    $scope.$on('$routeChangeStart', function(){
        var newLocation = getLocationBasePath($location.path());
        if(!$scope.msg[newLocation])
            fetchMessages(newLocation);
    });

    function fetchMessages(newLocation) {
        $scope.msg[newLocation] = Messages.get({
            packageName: newLocation,
            lang: $scope.lang
        });
    }

    function setApplicationLanguage() {
        var lang = $window.navigator.userLanguage || $window.navigator.language;
        lang = lang.toLowerCase();
        if(language.supported.indexOf(lang) == -1)
            lang = language.default;
        $scope.lang = lang;
    }

    function getLocationBasePath(path){
        path = path.substr(1);
        if(path.length == 0)
            return 'base';
        var firstSlash = path.indexOf('/');
        firstSlash = (firstSlash == -1 ? path.length : firstSlash);
        return path.substr(0, firstSlash);
    }
});
'use strict';

/**
 * @ngdoc function
 * @name activitiConsoleApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the activitiConsoleApp
 */
angular.module('activitiConsoleApp')
  .controller('LoginCtrl', function ($scope, $http, Authorization) {
    $scope.doLogin = function(){
        $http.post('api/validateCredentials', {
                login:$scope.login,
                password:$scope.password
            })
            .success(function(data, status) {
                alert(status);
                alert(data.valid);
                if(data.valid)
                    Authorization.login($scope.login, $scope.password);
            }).error(function(data, status) {
                alert(status);
                alert(data.valid);
            });
    };

    $scope.doTest = function(){
        $http.get('api/test')
            .success(function(data, status) {
                alert(status);
                alert(data.login);
            }).error(function(data, status) {
                alert(status);
                alert(data.login);
            });
    };

    $scope.doLogout = function(){
        Authorization.logout();
    };
});
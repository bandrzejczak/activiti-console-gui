'use strict';

/**
 * @ngdoc function
 * @name activitiConsoleApp.controller:LoginController
 * @description
 * # LoginController
 * Controller of the activitiConsoleApp
 */
angular.module('activitiConsoleApp')
  .controller('LoginController', function ($scope, $http, Auth) {
    $scope.doLogin = function(){
        $http.post("/service/validateCredentials", {
                login:$scope.login,
                password:$scope.password
            })
            .success(function(data, status, headers, config) {
                alert(status);
                alert(data.valid);
                if(data.valid)
                    Auth.login($scope.login, $scope.password);
            }).error(function(data, status, headers, config) {
                alert(status);
                alert(data.valid);
            });
    }

    $scope.doTest = function(){
        $http.get("/service/test")
            .success(function(data, status, headers, config) {
                alert(status);
                alert(data.login);
            }).error(function(data, status, headers, config) {
                alert(status);
                alert(data.login);
            });
    }

    $scope.doLogout = function(){
        Auth.logout();
    }
});
'use strict';

/**
 * @ngdoc function
 * @name activitiConsoleApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the activitiConsoleApp
 */
angular.module('activitiConsoleApp')
  .controller('LoginCtrl', function ($scope, $http, $location, Authorization) {
    $scope.doLogin = function(){
        $http.post('api/validateCredentials', {
                login:$scope.login,
                password:$scope.password
        })
        .success(function(data) {
            if(data.valid) {
                Authorization.login($scope.login, $scope.password);
                $location.path('/');
            }
            else {
                $scope.loginError = $scope.msg.login.invalidCredentials;
            }
        }).error(function(data, status) {
            $scope.loginError = $scope.msg.login.error + status;
        });
    };
});
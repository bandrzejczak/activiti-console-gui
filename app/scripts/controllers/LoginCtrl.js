'use strict';

/**
 * @ngdoc function
 * @name activitiConsoleApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the activitiConsoleApp
 */
angular.module('activitiConsoleApp')
    .controller('LoginCtrl', function ($scope, Groups, $state, $animate, Authorization) {
        $scope.doLogin = function () {
            Authorization.login($scope.login, $scope.password);
            $scope.loginError = undefined;
            Groups.get().$promise.then(
                function (data) {
                    Authorization.setAuthorizedUser($scope.login, data.groups);
                    $state.go('main.root');
                },
                function (error) {
                    if (error.status === 401) {
                        $scope.loginError = $scope.msg.login.invalidCredentials;
                    } else {
                        $scope.loginError = $scope.msg.login.error + error.status;
                    }
                }
            );
        };
    });
'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('LoginCtrl', function ($scope, Groups, $state, $animate, Authorization) {
        $scope.doLogin = function () {
            Authorization.login($scope.login, $scope.password);
            $scope.loginError = undefined;
            Groups.get().$promise.then(
                function (data) {
                    Authorization.setAuthorizedUser($scope.login, data.response.groups);
                    $state.go('app.tasks.inbox');
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
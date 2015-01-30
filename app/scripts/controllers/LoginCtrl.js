'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('LoginCtrl', ['$scope', 'Users', '$state', '$animate', 'Authorization',
        function ($scope, Users, $state, $animate, Authorization) {
        $scope.doLogin = function () {
            Authorization.login($scope.login, $scope.password);
            $scope.loginError = undefined;
            Users.groups({id: $scope.login}).$promise.then(
                function (data) {
                    Authorization.setAuthorizedUser($scope.login, data.response);
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
        }]);
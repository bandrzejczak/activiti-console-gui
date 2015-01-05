'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:AddDeploymentCtrl
 * @description
 * # AddDeploymentCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('AddDeploymentCtrl', ['$scope', '$http', '$state', 'SweetAlert', function ($scope, $http, $state, SweetAlert) {
        $scope.file = null;
        $scope.deployProcess = function () {
            $http
                .post('api/deployment', $scope.file)
                .success(function () {
                    SweetAlert.swal($scope.msg.deployments.add.success, '', 'success');
                    $state.go('app.deployments.list');
                });
        };
    }]
);
'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:TaskCtrl
 * @description
 * # TaskCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('TaskCtrl', ['$scope', 'Tasks', '$stateParams', 'SweetAlert', '$state',
        function ($scope, Tasks, $stateParams, SweetAlert, $state) {
        Tasks.form({type: $stateParams.id}).$promise.then(function (data) {
            $scope.task = data.response.task;
            $scope.description = data.response.description;
            $scope.form = data.response.fields;
            $scope.rights = data.response.rights;
        });

        $scope.formData = {};

        //TODO Copy paste -> Service
        $scope.dateProgress = function (dueDate, createTime) {
            return Math.floor((Date.now() - createTime) / (dueDate - createTime) * 100);
        };

        $scope.progressBarType = function (priority) {
            if (priority <= 25) {
                return 'success';
            } else if (priority <= 50) {
                return 'info';
            } else if (priority <= 75) {
                return 'warning';
            } else {
                return 'danger';
            }
        };

            $scope.claim = function () {
                Tasks.claim({type: $scope.task.id}).$promise.then(
                    function () {
                        SweetAlert.swal($scope.msg.tasks.claim.success, '', 'success');
                        $state.reload();
                    }
                );
            };

            $scope.unclaim = function () {
                Tasks.unclaim({type: $scope.task.id}).$promise.then(
                    function () {
                        SweetAlert.swal($scope.msg.tasks.unclaim.success, '', 'success');
                        $state.reload();
                    }
                );
            };

            $scope.submit = function () {
                if ($scope.taskForm.$valid) {
                    Tasks.submit({type: $scope.task.id}, $scope.formData).$promise.then(
                        function () {
                            SweetAlert.swal($scope.msg.tasks.submit.success, '', 'success');
                            $state.go('app.tasks.inbox');
                        }
                    );
                }
            };
    }]
);
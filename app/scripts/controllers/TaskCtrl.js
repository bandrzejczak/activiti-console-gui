'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:TaskCtrl
 * @description
 * # TaskCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('TaskCtrl', ['$scope', 'Tasks', '$stateParams', function ($scope, Tasks, $stateParams) {
        Tasks.form({type: $stateParams.id}).$promise.then(function (data) {
            $scope.task = data.response.task;
            $scope.description = data.response.description;
            $scope.form = data.response.fields;
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
    }]
);
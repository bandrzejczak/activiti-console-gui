'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:TasksCtrl
 * @description
 * # TasksCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('TasksCtrl', ['$scope', 'Tasks', 'ngTableParams', '$filter', '$state', 'SweetAlert',
        function ($scope, Tasks, NgTableParams, $filter, $state, SweetAlert) {
        $scope.type = $state.$current.type;
            $scope.empty = true;

        Tasks.get({type: $scope.type}).$promise.then(function (response) {
            var data = response.response;
            if (data.length > 0)
                $scope.empty = false;
            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 10,
                filter: {},
                sorting: {
                    priority: 'desc',
                    dueDate: 'asc',
                    createTime: 'desc'
                }
            }, {
                groupBy: 'processName',
                filterDelay: 100,
                counts: $scope.empty ? [] : [10, 25, 50, 100],
                total: data.length,
                getData: function ($defer, params) {
                    var filteredData = params.filter() ?
                        $filter('filter')(data, params.filter()) :
                        data;
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        data;

                    params.total(orderedData.length);
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });

            $scope.goToProcessesList = function () {
                $state.go('app.processes');
            };

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

            $scope.claim = function (taskId) {
            Tasks.claim({type: taskId}).$promise.then(
                function () {
                    SweetAlert.swal($scope.msg.tasks.claim.success, '', 'success');
                    $state.go('app.tasks.task', {id: taskId});
                }
            );
        };

            $scope.openTask = function (taskId, $event) {
                if ($event.target.tagName.toLowerCase() !== 'button')
                $state.go('app.tasks.task', {id: taskId});
            };
    }]
);
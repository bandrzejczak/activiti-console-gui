'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:TasksInboxCtrl
 * @description
 * # TasksInboxCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('TasksInboxCtrl', ['$scope', 'Tasks', 'ngTableParams', '$filter', function ($scope, Tasks, NgTableParams, $filter) {
        Tasks.get().$promise.then(function (response) {
            var data = response.response;
            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 10,
                filter: {},
                sorting: {
                    priority: 'desc',
                    dueDate: 'asc'
                }
            }, {
                groupBy: 'processName',
                filterDelay: 100,
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
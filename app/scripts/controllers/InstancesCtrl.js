'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:InstancesCtrl
 * @description
 * # InstancesCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('InstancesCtrl', ['$scope', 'Instances', 'ngTableParams', '$filter',
        function ($scope, Instances, NgTableParams, $filter) {
            $scope.empty = true;

            function flatten(data) {
                for (var i = 0; i < data.length; i++)
                    for (var property in data[i].currentTask)
                        if (data[i].currentTask.hasOwnProperty(property))
                            data[i]['currentTask' + capitaliseFirstLetter(property)] = data[i].currentTask[property];
                return data;
            }

            function capitaliseFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            Instances.get().$promise.then(function (response) {
                var data = response.response;
                if (data.length > 0)
                    $scope.empty = false;
                data = flatten(data);
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: 10,
                    filter: {},
                    sorting: {
                        startTime: 'desc'
                    }
                }, {
                    groupBy: 'processDefinitionId',
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
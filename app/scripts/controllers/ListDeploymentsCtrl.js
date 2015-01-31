'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:ListDeploymentsCtrl
 * @description
 * # ListDeploymentsCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('ListDeploymentsCtrl', ['$scope', '$filter', 'Deployments', 'ngTableParams', '$state', 'SweetAlert',
        function ($scope, $filter, Deployments, NgTableParams, $state, SweetAlert) {
            var deleteResource;
            $scope.empty = false;

            Deployments.get().$promise.then(function (response) {
                var data = response.response;
                if (data.length < 1)
                    $scope.empty = true;
                deleteResource = response.links.delete;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: 10,
                    filter: {},
                    sorting: {
                        key: 'asc',
                        version: 'desc'
                    }
                }, {
                    groupBy: 'key',
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

            $scope.remove = function (processDefinitionId) {
                SweetAlert.swal({
                    title: $scope.msg.deployments.list.delete.title,
                    text: $scope.msg.deployments.list.delete.text,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: $scope.msg.deployments.list.delete.confirmButtonText,
                    cancelButtonText: $scope.msg.deployments.list.delete.cancelButtonText,
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function () {
                    deleteResource.delete(
                        {processDefinitionId: processDefinitionId}
                    ).$promise.then(function () {
                            $state.reload();
                            SweetAlert.swal($scope.msg.deployments.list.delete.success, '', 'success');
                        });
                });
            };
        }]
);
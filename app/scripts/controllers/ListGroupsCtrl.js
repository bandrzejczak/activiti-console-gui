'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:ListGroupsCtrl
 * @description
 * # ListGroupsCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('ListGroupsCtrl', ['$scope', '$filter', 'Groups', 'ngTableParams', '$state',
        function ($scope, $filter, Groups, NgTableParams, $state) {
            var deleteResource;

            Groups.get().$promise.then(function (response) {
                var data = response.response;
                deleteResource = response.links.delete;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: 10,
                    filter: {},
                    sorting: {
                        id: 'asc'
                    }
                }, {
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
            $scope.editGroup = function (groupId) {
                $state.go('app.groups.edit', {id: groupId});
            };
        }]
);
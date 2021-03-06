'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:ListUsersCtrl
 * @description
 * # ListUsersCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('ListUsersCtrl', ['$scope', '$filter', 'Users', 'ngTableParams', '$state',
        function ($scope, $filter, Users, NgTableParams, $state) {
            var deleteResource;

            Users.get().$promise.then(function (response) {
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
            $scope.editUser = function (userId) {
                $state.go('app.users.edit', {id: userId});
            };
        }]
);
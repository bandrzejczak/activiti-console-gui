'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:EditUserGroupsCtrl
 * @description
 * # EditUserGroupsCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('EditUserGroupsCtrl', ['$scope', 'Users', '$stateParams', 'Groups',
        function ($scope, Users, $stateParams, Groups) {
            Users.get({id: $stateParams.id}).$promise.then(function (data) {
                $scope.user = data.response;
            });
            Users.groups({id: $stateParams.id}).$promise.then(function (data) {
                $scope.groups = data.response;
            });
            Groups.get().$promise.then(function (data) {
                $scope.availableGroups = data.response;
            });
            $scope.newGroup = undefined;

            $scope.addGroup = function () {
                $scope.newGroup = $scope.availableGroups[0].id;
            };

            $scope.removeGroup = function (id) {
                Groups.removeAssignment(
                    {
                        groupId: id,
                        userId: $scope.user.id
                    }
                ).$promise.then(function () {
                        $scope.groups.splice(findGroupIndex($scope.groups, id), 1);
                    });
            };

            $scope.removeNew = function () {
                $scope.newGroup = undefined;
            };

            $scope.assignNew = function () {
                Groups.createAssignment(
                    {groupId: $scope.newGroup},
                    {id: $scope.user.id}
                ).$promise.then(function () {
                        $scope.groups.push($scope.availableGroups[findGroupIndex($scope.availableGroups, $scope.newGroup)]);
                        $scope.groups = $scope.groups.sort(function (a, b) {
                            return a.id > b.id;
                        });
                        $scope.removeNew();
                    });
            };

            function findGroupIndex(groups, id) {
                for (var i = 0; i < groups.length; i++)
                    if (groups[i].id === id)
                        return i;
                return -1;
            }
        }
    ]
);
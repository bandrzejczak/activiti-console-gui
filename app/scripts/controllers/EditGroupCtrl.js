'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:EditGroupCtrl
 * @description
 * # EditGroupCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('EditGroupCtrl', ['$scope', '$stateParams', 'Groups', 'Authorization', 'SweetAlert', '$state',
        function ($scope, $stateParams, Groups, Authorization, SweetAlert, $state) {
            $scope.admin = Authorization.isAdmin();
            $scope.isNew = $stateParams.id === undefined;
            if ($scope.isNew) {
                $scope.group = {type: 'SECURITY_ROLE'};
            } else {
                Groups.get({groupId: $stateParams.id}).$promise.then(function (data) {
                    $scope.group = data.response;
                });
            }

            $scope.save = function () {
                var resource;
                if ($scope.isNew)
                    resource = Groups.create({groupId: null}, $scope.group);
                else
                    resource = Groups.update({groupId: $scope.group.id}, $scope.group);
                resource.$promise.then(function () {
                    if ($scope.isNew)
                        SweetAlert.swal($scope.msg.groups.edit.new.success, '', 'success');
                    else
                        SweetAlert.swal($scope.msg.groups.edit.existing.success, '', 'success');
                    $state.go('app.groups.list');
                });
            };

            $scope.deleteGroup = function () {
                SweetAlert.swal({
                    title: $scope.msg.groups.edit.delete.title,
                    text: $scope.msg.groups.edit.delete.text,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: $scope.msg.groups.edit.delete.confirmButtonText,
                    cancelButtonText: $scope.msg.groups.edit.delete.cancelButtonText,
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function () {
                    Groups.delete(
                        {groupId: $scope.group.id}
                    ).$promise.then(function () {
                            $state.go('app.groups.list');
                            SweetAlert.swal($scope.msg.groups.edit.delete.success, '', 'success');
                        });
                });
            };
        }
    ]
);
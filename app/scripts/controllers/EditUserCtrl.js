'use strict';

/**
 * @ngdoc function
 * @name bpmConsoleApp.controller:EditUserCtrl
 * @description
 * # EditUserCtrl
 * Controller of the bpmConsoleApp
 */
angular.module('bpmConsoleApp')
    .controller('EditUserCtrl', ['$scope', '$stateParams', 'Users', 'Authorization', 'SweetAlert', '$state',
        function ($scope, $stateParams, Users, Authorization, SweetAlert, $state) {
            $scope.admin = Authorization.isAdmin();
            $scope.isNew = $stateParams.id === undefined;
            if ($scope.isNew) {
                $scope.user = {};
            } else {
                Users.get({id: $stateParams.id}).$promise.then(function (data) {
                    $scope.user = data.response;
                });
            }

            $scope.editGroups = function () {
                $state.go('app.users.groups', {id: $scope.user.id});
            };

            $scope.save = function () {
                var resource;
                if ($scope.isNew)
                    resource = Users.create({id: null}, $scope.user);
                else
                    resource = Users.update({id: $scope.user.id}, $scope.user);
                resource.$promise.then(function () {
                    if ($scope.isNew)
                        SweetAlert.swal($scope.msg.users.edit.new.success, '', 'success');
                    else
                        SweetAlert.swal($scope.msg.users.edit.existing.success, '', 'success');
                    $state.go('app.users.list');
                });
            };

            $scope.deleteUser = function () {
                SweetAlert.swal({
                    title: $scope.msg.users.edit.delete.title,
                    text: $scope.msg.users.edit.delete.text,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: $scope.msg.users.edit.delete.confirmButtonText,
                    cancelButtonText: $scope.msg.users.edit.delete.cancelButtonText,
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function () {
                    Users.delete(
                        {id: $scope.user.id}
                    ).$promise.then(function () {
                            $state.go('app.users.list');
                            SweetAlert.swal($scope.msg.users.edit.delete.success, '', 'success');
                        });
                });
            };
        }
    ]
);
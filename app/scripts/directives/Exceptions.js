'use strict';
angular.module('bpmConsoleApp')
    .directive('exceptions', ['$rootScope', 'SweetAlert', '$state', function ($rootScope, SweetAlert, $state) {

        function errorMessage(data) {
            var errorMsg = $rootScope.msg.base.errors;
            var defaultErrorMsg = $rootScope.msg.base.errors.default;
            if (data && data.errorClass)
                return errorMsg[data.errorClass] || defaultErrorMsg;
            return defaultErrorMsg;
        }

        return {
            restrict: 'E',
            link: function () {
                $rootScope.$on('exception', function (event, data) {
                    var errorMsg = errorMessage(data);
                    SweetAlert.swal(errorMsg.title, errorMsg.message, 'error');
                    if (data.errorClass === 'AccessDeniedException')
                        $state.go('app.tasks.inbox');
                });
            }
        };
    }]
);


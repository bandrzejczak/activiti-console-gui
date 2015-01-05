'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.UnauthorizedResponseInterceptor
 * @description
 * # UnauthorizedResponseInterceptor
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .factory('ServerErrorInterceptor', function ($q, $rootScope, SweetAlert) {

        function errorMessage(data) {
            var errorMsg = $rootScope.msg.base.errors;
            var defaultErrorMsg = $rootScope.msg.base.errors.default;
            if (data && data.errorClass)
                return errorMsg[data.errorClass] || defaultErrorMsg;
            return defaultErrorMsg;
        }

        return {
            'responseError': function (rejection) {
                if (rejection.status === 500) {
                    var errorMsg = errorMessage(rejection.data);
                    SweetAlert.swal(errorMsg.title, errorMsg.message, 'error');
                }
                return $q.reject(rejection);
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('ServerErrorInterceptor');
    });
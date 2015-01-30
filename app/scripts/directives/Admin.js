'use strict';
angular.module('bpmConsoleApp')
    .directive('admin', ['Authorization', function (Authorization) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                if (!Authorization.isAdmin())
                    element.hide();
            }
        };
    }]
);


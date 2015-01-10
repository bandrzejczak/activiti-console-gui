'use strict';
angular.module('bpmConsoleApp')
    .directive('imageTooltip', ['$window', '$tooltip', '$compile', function ($window, $tooltip, $compile) {
        var $ = $window.jQuery;

        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            template: '<div></div>',
            replace: true,
            link: function (scope, element) {
                $(element)
                    .css('text-align', 'center')
                    .append(
                    $(
                        $compile(
                            '<span class="glyphicon glyphicon-eye-open white-tooltip"' +
                            'tooltip-placement="right"' +
                            'tooltip-html-unsafe="<img src=\'data:image/png;base64,' + scope.data + '\' />">' +
                            '</span>'
                        )(scope)
                    )
                );
            }
        };
    }]
);


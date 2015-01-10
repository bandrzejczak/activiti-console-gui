'use strict';
angular.module('bpmConsoleApp')
    .directive('boolean', ['$window', function ($window) {
        var $ = $window.jQuery;
        var classes = ['any', 'active', 'inactive'];
        var values = ['', 'true', 'false'];
        var state = 0;

        function currentClass() {
            return classes[state];
        }

        function currentValue() {
            return values[state];
        }

        return {
            restrict: 'E',
            template: '<span class="any" ng-style="hover ? {\'cursor\': \'pointer\'} : {}"' +
            'ng-mouseover="hover = true" ng-mouseover="hover = false"></span>',
            replace: true,
            scope: {
                'filter': '='
            },
            link: function (scope, element) {
                $(element).click(function () {
                    $(element).removeClass(currentClass());
                    state = (state + 1) % 3;
                    $(element).addClass(currentClass());
                    scope.filter = currentValue();
                    scope.$apply();
                });
            }
        };
    }]
).run(function ($templateCache) {
        $templateCache.put('ng-table/filters/boolean.html', '<boolean filter="params.filter()[name]"></boolean>');
        //$templateCache.put('ng-table/filters/boolean.html', '<input type="checkbox" ng-model="params.filter()[name]" name="filter-boolean" value="true" />');
    });


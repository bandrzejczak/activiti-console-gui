'use strict';

angular.module('bpmConsoleApp')
    .directive('guiErrorShake', function ($animate) {
        return {
            scope: {
                errorMsg: '='
            },
            link: function (scope, element) {
                scope.$watch('errorMsg', function (value) {
                    if (value) {
                        $animate.addClass(element, 'shake').then(function () {
                            $animate.removeClass(element, 'shake');
                        });
                    }
                });
            }
        };
    });
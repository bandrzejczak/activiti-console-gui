'use strict';
angular.module('bpmConsoleApp')
    .directive('formButtons', ['$window', '$rootScope', function ($window, $rootScope) {
        var $ = $window.jQuery;
        var buttonTypes = {
            unclaim: {
                type: 'button',
                msg: 'unclaim',
                class: 'btn-danger'
            },
            claim: {
                type: 'button',
                msg: 'claim',
                class: 'btn-success'
            },
            submit: {
                type: 'submit',
                msg: 'submit',
                class: 'btn-success'
            }
        };

        function addButton(type, onClick) {
            var button = $('<button></button>');
            button.attr('type', type.type);
            button.text($rootScope.msg.tasks.buttons[type.msg]);
            button.addClass('btn').addClass('btn-lg').addClass(type.class);
            button.click(function () {
                onClick();
            });
            return button;
        }

        function createButtons(scope) {
            var buttons = $('<div></div>');
            buttons.addClass('form-buttons');
            if (scope.rights.unclaim)
                buttons.append(addButton(buttonTypes.unclaim, scope.unclaim));
            if (scope.rights.write)
                buttons.append(addButton(buttonTypes.submit, scope.submit));
            if (!scope.rights.unclaim && !scope.rights.write && scope.rights.read)
                buttons.append(addButton(buttonTypes.claim, scope.claim));
            return buttons;
        }

        return {
            restrict: 'E',
            scope: {
                'rights': '=',
                'claim': '=',
                'submit': '=',
                'unclaim': '='
            },
            link: function (scope, element) {
                scope.$watch('rights', function (value) {
                    if (value !== undefined && value !== '')
                        element.append(createButtons(scope));
                });
            }
        };
    }]
);

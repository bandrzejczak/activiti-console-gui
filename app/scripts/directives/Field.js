'use strict';
angular.module('bpmConsoleApp')
    .directive('field', ['$compile', function ($compile) {
        function wrapWithNormalLabel(input) {
            return '<label class="control-label" ng-class="{\'ng-invalid\': !form[id].$pristine && form[id].$invalid}" for="{{id}}">{{name}}{{required ? \'*\' : \'\'}}</label>' +
                '<div class="controls">' +
                input +
                '</div>';
        }

        function wrapWithCheckboxLabel(input) {
            return '<div class="controls"><label for="{{id}}" ng-class="{\'ng-invalid\': form[id].$invalid}">{{name}}{{required ? \'*\' : \'\'}}&nbsp;</label>' + input + '</div>';
        }

        var templates = {
            string: wrapWithNormalLabel('<input class="form-control" type="text" id="{{id}}" name="{{id}}" ng-model="formData[id]" ng-required="required" ng-disabled="readOnly" />'),
            long: wrapWithNormalLabel('<input class="form-control" type="number" id="{{id}}" name="{{id}}" ng-model="formData[id]" ng-required="required" ng-disabled="readOnly" step="1" />'),
            date: wrapWithNormalLabel('<p class="input-group">' +
            '<input type="text" datepicker-popup="yyyy-MM-dd" datepicker-append-to-body="true" current-text="{{i18n.current}}" close-text="{{i18n.close}}" clear-text="{{i18n.clear}}" class="form-control" id="{{id}}" name="{{id}}" ng-model="dates[id]" ng-change="parseDate(id, dates[id])" is-open="opened" close-text="Close"  ng-required="required" ng-disabled="readOnly" />' +
            '<span class="input-group-btn">' +
            '<button type="button" class="btn btn-default" ng-click="open($event)" ng-disabled="readOnly"><i class="glyphicon glyphicon-calendar"></i></button>' +
            '</span>' +
            '</p>'),
            boolean: wrapWithCheckboxLabel('<input type="checkbox" id="{{id}}" name="{{id}}" ng-model="formData[id]" ng-required="required" ng-disabled="readOnly" />'),
            enum: wrapWithNormalLabel('<select class="form-control" id="{{id}}" name="{{id}}" ng-model="formData[id]" ng-required="required" ng-disabled="readOnly">' +
            '<option ng-repeat="(id, name) in enumOptions" value="{{id}}">{{name}}</option>' +
            '</select>'),
            double: wrapWithNormalLabel('<input class="form-control" type="number" id="{{id}}" name="{{id}}" ng-model="formData[id]" step="any" ng-required="required" ng-disabled="readOnly" />')
        };

        var parseValue = {
            string: function (value) {
                return value;
            },
            long: function (value) {
                return parseInt(value);
            },
            date: function (value) {
                return parseInt(value);
            },
            boolean: function (value) {
                return Boolean(value);
            },
            enum: function (value) {
                if(value)
                    return value;
                return undefined;
            },
            double: function (value) {
                return parseFloat(value);
            }
        };

        function formatDate(value) {
            if (!value) return undefined;
            var date = new Date(parseInt(value));
            return date.getFullYear() + '-' + addLeadingZero(date.getMonth() + 1) + '-' + addLeadingZero(date.getDate());
        }

        function parseDate(value) {
            if (!value) return undefined;
            return value.getTime();
        }

        function addLeadingZero(number) {
            return ('0' + number).slice(-2);
        }

        function getTemplate(type) {
            return templates[type] || templates.string;
        }

        function parser(type) {
            return parseValue[type] || parseValue.string;
        }

        function parseImmutable(text, readOnly) {
            if(readOnly)
                text = text.replace('formData', 'immutableData');
            return text;
        }

        return {
            restrict: 'E',
            scope: {
                'form': '=',
                'formData': '=',
                'type': '=',
                'id': '=',
                'name': '=',
                'value': '=',
                'required': '=',
                'readOnly': '=',
                'enumOptions': '=',
                'i18n': '='
            },
            link: function (scope, element) {
                scope.dates = {};
                scope.immutableData = {};
                var value = parser(scope.type)(scope.value);
                if(!scope.readOnly)
                    scope.formData[scope.id] = value;
                else
                    scope.immutableData[scope.id] = value;
                if (scope.type === 'date')
                    scope.dates[scope.id] = formatDate(scope.value);
                scope.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    scope.opened = true;
                };
                scope.parseDate = function (id, date) {
                    scope.formData[id] = parseDate(date);
                };
                element.html(parseImmutable(getTemplate(scope.type), scope.readOnly)).show();
                $compile(element.contents())(scope);
            }
        };
    }]
);

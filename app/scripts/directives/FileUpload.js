'use strict';
angular.module('bpmConsoleApp')
    .directive('fileUpload', ['SweetAlert', '$rootScope', '$window', function (SweetAlert, $rootScope, $window) {
        var $ = $window.jQuery;
        var maxSize;

        function checkSize(size) {
            if (!maxSize || size / (1024 * 1024) < maxSize)
                return true;
            else {
                SweetAlert.swal(
                    $rootScope.msg.base.directives.fileUpload.fileTooBig.title,
                    $rootScope.msg.base.directives.fileUpload.fileTooBig.message.replace(/\{size\}/g, maxSize),
                    'error'
                );
                return false;
            }
        }

        function preventDefault(event) {
            event.preventDefault();
            return false;
        }

        return {
            restrict: 'E',
            scope: {
                file: '=',
                uploadSuccess: '=',
                maxFileSize: '@'
            },
            template: '<div class="fileUpload">' +
            '<span class="fileUploadTitle"><h2>' + $rootScope.msg.base.directives.fileUpload.title + '</h2></span>' +
            '<span class="fileUploadContent">' + $rootScope.msg.base.directives.fileUpload.content + '</span>' +
            '</div>',
            link: function (scope, element) {
                element = $(element).find('.fileUpload');
                maxSize = scope.maxFileSize;
                var processFile = function (event) {
                    var file, name, reader, size;
                    event.preventDefault();
                    reader = new FileReader();
                    reader.onload = function (event) {
                        if (checkSize(size)) {
                            scope.file = {
                                fileName: name,
                                fileSize: size,
                                base64: event.target.result.split(',')[1]
                            };
                            scope.$apply();
                            if (scope.uploadSuccess)
                                scope.uploadSuccess();
                        }
                    };
                    file = (event.target.files ? event.target.files[0] : event.originalEvent.dataTransfer.files[0]);
                    name = file.name;
                    size = file.size;
                    reader.readAsDataURL(file);
                    return false;
                };
                element.on('dragover', preventDefault);
                element.on('dragenter', preventDefault);
                element.on('drop', processFile);
                element.on('click', function () {
                    var classicFile = $('<input type="file" />');
                    $(classicFile).change(processFile);
                    $(classicFile).click();
                });
            }
        };
    }]
);


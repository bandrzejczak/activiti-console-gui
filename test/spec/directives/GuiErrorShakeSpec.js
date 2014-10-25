'use strict';

describe('guiErrorShake', function() {

    var element, scope, timeout;

    beforeEach(module('activitiConsoleApp'));

    beforeEach(inject(function($rootScope, $compile, $timeout) {
        scope = $rootScope.$new();
        scope.error = undefined;
        timeout = $timeout;
        element = $compile('<div gui-error-shake error-msg="error"></div>')(scope);
    }));

    it('should add "shake" class when error variable changed', function () {
        //given
        element.attr('class', '');

        //when
        scope.error = 'new error';
        scope.$digest();

        //then
        expect(element.attr('class')).toBe('shake');
    });

    it('should remove "shake" class when animation is finished', function () {
        //given
        element.attr('class', '');
        scope.error = 'new error';
        scope.$digest();
        expect(element.attr('class')).toBe('shake');

        //when
        timeout(function() {
            scope.error = undefined;
            scope.$digest();
        });
        timeout.flush();

        //then
        expect(element.attr('class')).not.toBe('shake');
    });
});
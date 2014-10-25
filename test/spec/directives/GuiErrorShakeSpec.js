'use strict';

describe('guiErrorShake', function() {

    var element, scope;

    beforeEach(module('activitiConsoleApp'));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.error = undefined;
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
});
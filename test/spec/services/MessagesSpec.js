'use strict';

describe('Messages', function () {

    var PACKAGE_NAME = 'base',
        LANGUAGE = 'en',
        TEST_MESSAGES = {
            test: 'test'
        };

    var Messages,
        mockHttp;

    beforeEach(module('activitiConsoleApp'));

    beforeEach(inject(
        function (_Messages_, $httpBackend) {
            Messages = _Messages_;
            mockHttp = $httpBackend;
        }));

    it('should be defined', function () {
        expect(Messages).toBeDefined();
    });

    it('should fetch messages for chosen language and package', function () {
        //given
        var messageFetchRequest = {
            packageName: PACKAGE_NAME,
            lang: LANGUAGE
        };

        //when
        mockHttp
            .expectGET('messages/' + LANGUAGE + '/' + PACKAGE_NAME + '.json')
            .respond(TEST_MESSAGES);
        var actualMessages = Messages.get(messageFetchRequest);
        mockHttp.flush();

        //then
        expect(actualMessages.test).toBeDefined();
        expect(actualMessages.test).toBe(TEST_MESSAGES.test);
    });

});

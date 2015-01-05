'use strict';

describe('Groups', function () {

    var REST_API_VALUE_NAME = 'RESTApiURL',
        REST_API_URL = 'http://example.com/',
        TEST_GROUPS = ['ADMIN'];

    var Groups,
        mockHttp;

    beforeEach(module('bpmConsoleApp'));

    beforeEach(module(function ($provide) {
        $provide.value(REST_API_VALUE_NAME, REST_API_URL);
    }));

    beforeEach(inject(
        function (_Groups_, $httpBackend) {
            Groups = _Groups_;
            mockHttp = $httpBackend;
        }));

    it('should be defined', function () {
        expect(Groups).toBeDefined();
    });

    it('should fetch groups', function () {
        //when
        mockHttp
            .expectGET(REST_API_URL + 'groups')
            .respond(TEST_GROUPS);
        var actualGroups = Groups.get();
        mockHttp.flush();

        //then
        expect(actualGroups.response).toBeDefined();
        expect(actualGroups.response[0]).toBe(TEST_GROUPS[0]);
    });

});

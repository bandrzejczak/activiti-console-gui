'use strict';

describe('UnauthorizedResponseInterceptor', function () {

    var EXAMPLE_WEBSITE = 'http://example.com',
        EXAMPLE_DATA = 'data';

    var unauthorizedResponseInterceptor,
        mockHttp,
        http,
        location;

    beforeEach(module('bpmConsoleApp'));

    beforeEach(inject(
        function (_UnauthorizedResponseInterceptor_, $httpBackend, $http, $location) {
            unauthorizedResponseInterceptor = _UnauthorizedResponseInterceptor_;
            mockHttp = $httpBackend;
            http = $http;
            location = $location;
        }));

    it('should be defined', function () {
        expect(unauthorizedResponseInterceptor).toBeDefined();
    });

    it('should redirect user to login page when server responds with Unauthorized', function () {
        //when
        http.get(EXAMPLE_WEBSITE);

        //then
        mockHttp.expectGET(EXAMPLE_WEBSITE).respond(401);
        mockHttp.flush();
        expect(location.path()).toBe('/login');
    });

    it('shouldnt interfere if the server doenst respond with Unauthorized', function () {
        //given
        var resultingData = '';

        //when
        http
            .get(EXAMPLE_WEBSITE)
            .success(function (data) {
                resultingData = data;
            });

        //then
        mockHttp.expectGET(EXAMPLE_WEBSITE).respond(200, EXAMPLE_DATA);
        mockHttp.flush();
        expect(location.path()).toBe('');
        expect(resultingData).toBe(EXAMPLE_DATA);
    });

});


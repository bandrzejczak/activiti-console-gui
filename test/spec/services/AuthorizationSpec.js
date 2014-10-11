'use strict';

describe('Authorization', function() {

    var LOGIN = 'login',
        PASSWORD = 'password',
        EXPECTED_HEADER_NAME = 'Authorization',
        EXPECTED_HEADER_VALUE = 'Basic ' + btoa(LOGIN + ':' + PASSWORD),
        TEST_URL = 'http://example.com/';
    
    var Authorization,
        mockHttp,
        http,
        cookies;

    beforeEach(module('activitiConsoleApp'));

    beforeEach(inject(
        function (_Authorization_, $httpBackend, $http, $cookies) {
            Authorization = _Authorization_;
            mockHttp = $httpBackend;
            http = $http;
            cookies = $cookies;
        }));

    it('should be defined', function () {
        expect(Authorization).toBeDefined();
    });

    it('shouldnt add authorization header if user is not logged in', function () {
        //when
        mockHttp.expectGET(TEST_URL, function(headers) {
            return headers[EXPECTED_HEADER_NAME] === undefined;
        }).respond(200);
        http.get(TEST_URL);
        mockHttp.flush();

        //then
        expect(cookies.Authorization).toBeUndefined();
        mockHttp.verifyNoOutstandingExpectation();
    });

    it('should add authorization header if user is logged in', function () {
        //given
        Authorization.login(LOGIN, PASSWORD);
        
        //when
        mockHttp.expectGET(TEST_URL, function(headers) {
            return headers[EXPECTED_HEADER_NAME] === EXPECTED_HEADER_VALUE;
        }).respond(200);
        http.get(TEST_URL);
        mockHttp.flush();

        //then
        expect(cookies.Authorization).toBe(EXPECTED_HEADER_VALUE);
        mockHttp.verifyNoOutstandingExpectation();
    });

    it('shouldnt add authorization header if user logged out', function () {
        //given
        Authorization.login(LOGIN, PASSWORD);
        mockHttp.expectGET(TEST_URL, function(headers) {
            return headers[EXPECTED_HEADER_NAME] === EXPECTED_HEADER_VALUE;
        }).respond(200);
        http.get(TEST_URL);
        mockHttp.flush();
        expect(cookies.Authorization).toBe(EXPECTED_HEADER_VALUE);
        Authorization.logout();

        //when
        mockHttp.expectGET(TEST_URL, function(headers) {
            return headers[EXPECTED_HEADER_NAME] === undefined;
        }).respond(200);
        http.get(TEST_URL);
        mockHttp.flush();

        //then
        expect(cookies.Authorization).toBeUndefined();
        mockHttp.verifyNoOutstandingExpectation();
    });

});

'use strict';

describe('Authorization', function () {

    var LOGIN = 'login',
        PASSWORD = 'password',
        GROUPS = [{id: 'group'}],
        EXPECTED_HEADER_NAME = 'Authorization',
        EXPECTED_HEADER_VALUE = 'Basic ' + btoa(LOGIN + ':' + PASSWORD),
        TEST_URL = 'http://example.com/',
        TIMEOUT_VALUE_NAME = 'loginTimeout',
        LOGIN_TIMEOUT = 100;

    var Authorization,
        mockHttp,
        http,
        ipCookie,
        timeout;

    beforeEach(module('bpmConsoleApp'));

    beforeEach(module(function ($provide) {
        $provide.value(TIMEOUT_VALUE_NAME, LOGIN_TIMEOUT);
    }));


    beforeEach(inject(
            function (_Authorization_, $httpBackend, $http, _ipCookie_, $timeout) {
                mockHttp = $httpBackend;
                http = $http;
                ipCookie = _ipCookie_;
                Authorization = _Authorization_;
                timeout = $timeout;
            })
    );

    afterEach(function () {
        ipCookie.remove(EXPECTED_HEADER_NAME);
    });

    it('should add authorization header if its saved as a cookie', function () {
        //given
        ipCookie(EXPECTED_HEADER_NAME, EXPECTED_HEADER_VALUE);
        Authorization.init();

        //when
        mockHttp.expectGET(TEST_URL, function (headers) {
            return headers[EXPECTED_HEADER_NAME] === EXPECTED_HEADER_VALUE;
        }).respond(200);
        http.get(TEST_URL);
        mockHttp.flush();

        //then
        expect(ipCookie('Authorization')).toBe(EXPECTED_HEADER_VALUE);
        mockHttp.verifyNoOutstandingExpectation();
    });

    it('should be defined', function () {
        expect(Authorization).toBeDefined();
    });

    it('shouldnt add authorization header if user is not logged in', function () {
        expectAuthorizationHeaderNotToBeSet();
        expect(ipCookie('Authorization')).toBeUndefined();
        mockHttp.verifyNoOutstandingExpectation();
    });

    it('should add authorization header if user is logged in', function () {
        //when
        Authorization.login(LOGIN, PASSWORD);

        //then
        expectAuthorizationHeaderToBeSet();
        expect(ipCookie('Authorization')).toBe(EXPECTED_HEADER_VALUE);
        mockHttp.verifyNoOutstandingExpectation();
    });

    it('shouldnt add authorization header if user logged out', function () {
        //given
        Authorization.login(LOGIN, PASSWORD);
        expectAuthorizationHeaderToBeSet();
        expect(ipCookie('Authorization')).toBe(EXPECTED_HEADER_VALUE);

        //when
        Authorization.logout();

        //then
        expectAuthorizationHeaderNotToBeSet();
        expect(ipCookie('Authorization')).toBeUndefined();
        mockHttp.verifyNoOutstandingExpectation();
    });

    it('should be able to set authorizedUser', function () {
        //when
        Authorization.setAuthorizedUser(LOGIN, GROUPS);
        //then
        expect(Authorization.getUserLogin()).toBe(LOGIN);
        expect(Authorization.userGroupsContain(GROUPS[0].id)).toBeTruthy();
    });

    it('should logout user after timeout', function () {
        //given
        Authorization.login(LOGIN, PASSWORD);
        expectAuthorizationHeaderToBeSet();
        timeout.flush(LOGIN_TIMEOUT * 60000 - 1);
        expectAuthorizationHeaderToBeSet();

        //when
        timeout.flush(1);

        //then
        expectAuthorizationHeaderNotToBeSet();
    });

    function expectAuthorizationHeaderNotToBeSet() {
        mockHttp.expectGET(TEST_URL, function (headers) {
            return headers[EXPECTED_HEADER_NAME] === undefined;
        }).respond(200);
        http.get(TEST_URL);
        mockHttp.flush();
    }

    function expectAuthorizationHeaderToBeSet() {
        mockHttp.expectGET(TEST_URL, function (headers) {
            return headers[EXPECTED_HEADER_NAME] === EXPECTED_HEADER_VALUE;
        }).respond(200);
        http.get(TEST_URL);
        mockHttp.flush();
    }
});

//it's in the browser, but PhantomJS doesn't have it
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            FNOP = function () {
            },
            fBound = function () {
                return fToBind.apply(this instanceof FNOP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        FNOP.prototype = this.prototype;
        fBound.prototype = new FNOP();

        return fBound;
    };
}
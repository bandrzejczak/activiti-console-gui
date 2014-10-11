'use strict';

describe('LoginCtrl', function () {

    var LOGIN = 'login',
        PASSWORD = 'password',
        LOGIN_OBJECT = {
            login: LOGIN,
            password: PASSWORD
        },
        REST_API_VALUE_NAME = 'RESTApiURL',
        REST_API_URL = 'http://example.com/',
        VALIDATE_CREDENTIALS_PATH = 'validateCredentials',
        POSITIVE_RESPONSE_OBJECT = {
            valid: true
        },
        NEGATIVE_RESPONSE_OBJECT = {
            valid: false
        };

    var LoginCtrl,
        scope,
        mockHttp,
        Authorization;

    beforeEach(module('activitiConsoleApp'));

    beforeEach(module(function($provide){
        $provide.value(REST_API_VALUE_NAME, REST_API_URL);
    }));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        scope.msg = {
            login: {
                invalidCredentials: 'invalidCredentials',
                error: 'error'
            }
        };
        mockHttp = $httpBackend;
        Authorization = {
            login: jasmine.createSpy('login')
        };
        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope,
            Authorization: Authorization
        });
    }));

    it('should show error when credentials are incorrect', function () {
        //given
        scope.login = LOGIN;
        scope.password = PASSWORD;

        //when
        mockHttp
            .expectPOST(REST_API_URL + VALIDATE_CREDENTIALS_PATH, LOGIN_OBJECT)
            .respond(200, NEGATIVE_RESPONSE_OBJECT);
        scope.doLogin();
        mockHttp.flush();

        //then
        expect(Authorization.login.callCount).toEqual(0);
        expect(scope.loginError).toEqual(scope.msg.login.invalidCredentials);
    });

    it('should show error when validate credentials resource responds with error', function () {
        //given
        scope.login = LOGIN;
        scope.password = PASSWORD;
        var errorCode = 500;

        //when
        mockHttp
            .expectPOST(REST_API_URL + VALIDATE_CREDENTIALS_PATH, LOGIN_OBJECT)
            .respond(errorCode);
        scope.doLogin();
        mockHttp.flush();

        //then
        expect(Authorization.login.callCount).toEqual(0);
        expect(scope.loginError).toEqual(scope.msg.login.error + errorCode);
    });

    it('should log in and redirect to home page when the credentials are correct', function () {
        //given
        scope.login = LOGIN;
        scope.password = PASSWORD;

        //when
        mockHttp
            .expectPOST(REST_API_URL + VALIDATE_CREDENTIALS_PATH, LOGIN_OBJECT)
            .respond(200, POSITIVE_RESPONSE_OBJECT);
        scope.doLogin();
        mockHttp.flush();

        //then
        expect(Authorization.login).toHaveBeenCalled();
    });

});

'use strict';

describe('LoginCtrl', function () {

    var LOGIN = 'login',
        PASSWORD = 'password',
        REST_API_VALUE_NAME = 'RESTApiURL',
        REST_API_URL = 'http://example.com/',
        TASKS_PATH = 'groups';

    var LoginCtrl,
        scope,
        mockHttp,
        Authorization,
        state;

    beforeEach(module('activitiConsoleApp'));

    beforeEach(module(function ($provide) {
        $provide.value(REST_API_VALUE_NAME, REST_API_URL);
    }));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $state) {
        state = $state;
        scope = $rootScope.$new();
        scope.msg = {
            login: {
                invalidCredentials: 'invalidCredentials',
                error: 'error'
            }
        };
        mockHttp = $httpBackend;
        Authorization = {
            login: jasmine.createSpy('login'),
            setAuthorizedUser: jasmine.createSpy('setAuthorizedUser')
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
            .expectGET(REST_API_URL + TASKS_PATH)
            .respond(401);
        expectHomeViewFetched();
        expectLoginViewFetched();
        scope.doLogin();
        mockHttp.flush();

        //then
        expect(Authorization.setAuthorizedUser).not.toHaveBeenCalled();
        expect(scope.loginError).toEqual(scope.msg.login.invalidCredentials);
    });

    it('should show error when validate credentials resource responds with error', function () {
        //given
        scope.login = LOGIN;
        scope.password = PASSWORD;
        var errorCode = 500;

        //when
        mockHttp
            .expectGET(REST_API_URL + TASKS_PATH)
            .respond(errorCode);
        expectHomeViewFetched();
        scope.doLogin();
        mockHttp.flush();

        //then
        expect(Authorization.setAuthorizedUser).not.toHaveBeenCalled();
        expect(scope.loginError).toEqual(scope.msg.login.error + errorCode);
    });

    it('should log in and redirect to home page when the credentials are correct', function () {
        //given
        scope.login = LOGIN;
        scope.password = PASSWORD;

        //when
        mockHttp
            .expectGET(REST_API_URL + TASKS_PATH)
            .respond(200);
        expectHomeViewFetched();
        scope.doLogin();
        mockHttp.flush();

        //then
        expect(Authorization.setAuthorizedUser).toHaveBeenCalled();
        expect(state.current.name).toBe('main.root');
    });


    function expectHomeViewFetched() {
        mockHttp
            .expectGET('views/mainLayout.html')
            .respond(200);
        mockHttp
            .expectGET('views/home.html')
            .respond(200);
    }

    function expectLoginViewFetched() {
        mockHttp
            .expectGET('views/login.html')
            .respond(200);
    }

});

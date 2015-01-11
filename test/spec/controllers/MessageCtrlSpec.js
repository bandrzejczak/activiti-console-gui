'use strict';

describe('MessageCtrl', function () {
    var controller, rootScope, scope,
        state, window, lang, msgService, mockHttp;

    beforeEach(module('bpmConsoleApp'));

    beforeEach(module(
        function ($stateProvider) {
            $stateProvider
                .state('test', {
                    url: '/test',
                    templateUrl: 'views/test.html'
                })
                .state('deepTest', {
                    url: '/test/deeper',
                    templateUrl: 'views/test.html'
                });
        }
    ));

    beforeEach(inject(
        function ($controller, _$httpBackend_,
                  _$rootScope_, _$state_, $window,
                  language, Messages) {
            rootScope = _$rootScope_;
            scope = rootScope.$new();
            state = _$state_;
            window = $window;
            lang = language;
            msgService = Messages;
            mockHttp = _$httpBackend_;
            controller = $controller;
        }));

    it('should fetch base messages',
        function () {
            //when
            initMessageCtrlWithLanguage('en');

            //then
            expect(scope.msg.base.testMsg).toBe('test');
        }
    );

    it('should fetch messages from base package when changing location',
        function () {
            //given
            initMessageCtrlWithLanguage('en');

            //when
            mockHttp
                .expectGET('messages/en/test.json')
                .respond({test: 'test'});
            mockHttp
                .expectGET('views/test.html')
                .respond(200);
            changeLocation('test');

            //then
            expect(scope.msg.test.test).toBe('test');
        }
    );

    it('should fetch messages from base package when changing detailed location',
        function () {
            //given
            initMessageCtrlWithLanguage('en');

            //when
            mockHttp
                .expectGET('messages/en/test.json')
                .respond({test: 'test'});
            mockHttp
                .expectGET('views/test.html')
                .respond(200);
            changeLocation('deepTest');

            //then
            expect(scope.msg.test.test).toBe('test');
            expect(state.current.templateUrl).toBe('views/test.html');
        }
    );

    it('shouldnt put non existent messages into scope',
        function () {
            //given
            initMessageCtrlWithLanguage('en');

            //when
            mockHttp
                .expectGET('messages/en/test.json')
                .respond(404);
            mockHttp
                .expectGET('views/test.html')
                .respond(200);
            changeLocation('test');

            //then
            expect(scope.msg.test.test).toBeUndefined();
            expect(state.current.templateUrl).toBe('views/test.html');
        }
    );

    it('should fall back to default language if language is not supported',
        function () {
            //when
            initMessageCtrlWithLanguage('es');

            //then
            expect(scope.lang).toBe('en');
        }
    );

    it('shouldnt download same messages twice',
        function () {
            //given
            initMessageCtrlWithLanguage('en');

            //when
            mockHttp
                .expectGET('messages/en/test.json')
                .respond({test: 'test'});
            mockHttp
                .expectGET('views/test.html')
                .respond(200);
            changeLocation('test');
            expect(scope.msg.test.test).toBe('test');
            state.go('deepTest');
            rootScope.$digest();

            //then
            mockHttp.verifyNoOutstandingRequest();
        }
    );

    function initMessageCtrlWithLanguage(language) {
        mockHttp
            .expectGET('messages/en/base.json')
            .respond({testMsg: 'test'});
        mockHttp
            .expectGET('messages/en/tasks.json')
            .respond({testMsg: 'test'});
        mockHttp
            .expectGET('views/mainLayout.html')
            .respond(200);
        mockHttp
            .expectGET('views/tasks.inbox.html')
            .respond(200);
        window.navigator.userLanguage = language;
        controller('MessageCtrl', {
            $scope: scope,
            $window: window,
            $state: state,
            language: lang,
            Messages: msgService
        });
        mockHttp.flush();
    }

    function changeLocation(stateName) {
        state.go(stateName);
        rootScope.$digest();
        mockHttp.flush();
    }

});
describe('MessageCtrl', function() {
    'use strict';
    var controller, rootScope, route, scope,
        location, window, lang, msgService, mockHttp;

    beforeEach(module('activitiConsoleApp'));

    beforeEach(inject(
        function($controller, _$httpBackend_, _$route_,
                 _$rootScope_, _$location_, $window,
                 language, Messages) {
        rootScope = _$rootScope_;
        scope = rootScope.$new();
        route = _$route_;
        location = _$location_;
        window = $window;
        lang = language;
        msgService = Messages;
        mockHttp = _$httpBackend_;
        controller = $controller;
    }));

    it('should fetch base messages',
        function() {
            initMessageCtrlWithLanguage('en');
            expect(scope.msg.base.testMsg).toBe('test');
        }
    );

    it('should fetch messages from base package when changing location',
        function(){
            initMessageCtrlWithLanguage('en');
            mockHttp
                .expectGET('messages/en/task.json')
                .respond({test: 'test'});
            mockHttp
                .expectGET('views/task.html')
                .respond(200);
            changeLocation('/task');
            expect(scope.msg.task.test).toBe('test');
        }
    );

    it('should fetch messages from base package when changing detailed location',
        function(){
            initMessageCtrlWithLanguage('en');
            mockHttp.expectGET('messages/en/task.json').respond({test: 'test'});
            changeLocation('/task/long/url/should/work');
            expect(scope.msg.task.test).toBe('test');
            expect(route.current.templateUrl).toBe('views/home.html');
        }
    );

    it('shouldnt put non existent messages into scope',
        function(){
            initMessageCtrlWithLanguage('en');
            mockHttp.expectGET('messages/en/tasks.json').respond(404);
            changeLocation('/tasks');
            expect(scope.msg.task).toBeUndefined();
            expect(route.current.templateUrl).toBe('views/home.html');
        }
    );

    it('should fall back to default language if language is not supported',
        function (){
            initMessageCtrlWithLanguage('es');
            expect(scope.lang).toBe('en');
        }
    );

    it('shouldnt download same messages twice',
        function(){
            initMessageCtrlWithLanguage('en');
            mockHttp
                .expectGET('messages/en/task.json')
                .respond({test: 'test'});
            mockHttp
                .expectGET('views/task.html')
                .respond(200);
            changeLocation('/task');
            expect(scope.msg.task.test).toBe('test');
            location.path('/task/deeper');
            rootScope.$digest();
        }
    );

    function initMessageCtrlWithLanguage(language){
        mockHttp
            .expectGET('messages/en/base.json')
            .respond({testMsg: 'test'});
        mockHttp
            .expectGET('views/home.html')
            .respond(200);
        window.navigator.userLanguage = language;
        controller('MessageCtrl', {
            $scope: scope,
            $location: location,
            $window: window,
            language: lang,
            Messages: msgService
        });
        mockHttp.flush();
    }

    function changeLocation(path) {
        location.path(path);
        rootScope.$digest();
        mockHttp.flush();
    }

});
describe('messageController', function() {
    var controller, rootScope, route, scope,
        location, window, lang, msgService, mockHttp;

    beforeEach(module('activitiConsole'));

    beforeEach(inject(
        function($controller, _$httpBackend_, _$route_,
                 _$rootScope_, _$location_, $window,
                 language, messageService) {
        rootScope = _$rootScope_;
        scope = rootScope.$new();
        route = _$route_;
        location = _$location_;
        window = $window;
        lang = language;
        msgService = messageService;
        mockHttp = _$httpBackend_;
        controller = $controller;
    }));

    it('should fetch base messages',
        function() {
            initMessageControllerWithLanguage("en");
            expect(scope.msg.base.testMsg).toBe('test');
        }
    );

    it('should fetch messages from base package when changing location',
        function(){
            initMessageControllerWithLanguage("en");
            mockHttp
                .expectGET("messages/en/task.json")
                .respond({test: 'test'});
            mockHttp
                .expectGET("views/task.html")
                .respond(200);
            changeLocation('/task');
            expect(scope.msg.task.test).toBe('test');
        }
    );

    it('should fetch messages from base package when changing detailed location',
        function(){
            initMessageControllerWithLanguage("en");
            mockHttp.expectGET("messages/en/task.json").respond({test: 'test'});
            changeLocation('/task/long/url/should/work');
            expect(scope.msg.task.test).toBe('test');
            expect(route.current.templateUrl).toBe('views/home.html');
        }
    );

    it('shouldnt put non existent messages into scope',
        function(){
            initMessageControllerWithLanguage("en");
            mockHttp.expectGET("messages/en/tasks.json").respond(404);
            changeLocation('/tasks');
            expect(scope.msg.task).toBeUndefined();
            expect(route.current.templateUrl).toBe('views/home.html');
        }
    );

    it('should fall back to default language if language is not supported',
        function (){
            initMessageControllerWithLanguage("es");
            expect(scope.lang).toBe('en');
        }
    );

    it('shouldnt download same messages twice',
        function(){
            initMessageControllerWithLanguage("en");
            mockHttp
                .expectGET("messages/en/task.json")
                .respond({test: 'test'});
            mockHttp
                .expectGET("views/task.html")
                .respond(200);
            changeLocation('/task');
            expect(scope.msg.task.test).toBe('test');
            location.path('/task/deeper');
            rootScope.$digest();
        }
    );

    function initMessageControllerWithLanguage(language){
        mockHttp
            .expectGET("messages/en/base.json")
            .respond({testMsg: 'test'});
        mockHttp
            .expectGET("views/home.html")
            .respond(200);
        window.navigator.userLanguage = language;
        controller('messageController', {
            $scope: scope,
            $location: location,
            $window: window,
            language: lang,
            messageService: msgService
        });
        mockHttp.flush();
    }

    function changeLocation(path) {
        location.path(path);
        rootScope.$digest();
        mockHttp.flush();
    }

});
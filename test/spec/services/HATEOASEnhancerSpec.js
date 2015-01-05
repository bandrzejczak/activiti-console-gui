'use strict';

describe('HATEOASEnhancer', function () {

    var REST_API_VALUE_NAME = 'RESTApiURL',
        REST_API_URL = 'http://example.com/',
        NEXT_PATH = 'services',
        LINK_HEADER = '</' + NEXT_PATH + '>; rel="next"; actions="[{"name":"refresh","method":"GET"}]"',
        TEST_DATA = { test: 'test' };

    var HATEOASEnhancer,
        mockHttp,
        http;

    beforeEach(module('bpmConsoleApp'));

    beforeEach(module(function ($provide) {
        $provide.value(REST_API_VALUE_NAME, REST_API_URL);
    }));

    beforeEach(inject(
            function (_HATEOASEnhancer_, $httpBackend, $http) {
                HATEOASEnhancer = _HATEOASEnhancer_;
                mockHttp = $httpBackend;
                http = $http;
            })
    );

    it('should be defined', function() {
        expect(HATEOASEnhancer).toBeDefined();
    });

    it('should link connected resources to the call result', function() {
        var result = getAnyResourceWithLinks();
        //when
        mockHttp.expectGET(REST_API_URL + NEXT_PATH).respond(200, TEST_DATA);
        var resultFromLinkInvocation;
        result.links.next.refresh().$promise.then(function(data){
            resultFromLinkInvocation = data;
        });
        mockHttp.flush();
        //then
        expect(resultFromLinkInvocation).toBeDefined();
        expect(resultFromLinkInvocation.response).toEqual(TEST_DATA);
        expect(resultFromLinkInvocation.links).toBeUndefined();
    });

    function getAnyResourceWithLinks() {
        //when
        mockHttp.expectGET(REST_API_URL).respond(200, TEST_DATA, {Link: LINK_HEADER});
        var result;
        http.get(REST_API_URL).success(function (data) {
            result = data;
        });
        mockHttp.flush();

        //then
        expect(result).toBeDefined();
        expect(result.response).toEqual(TEST_DATA);
        expect(result.links).toBeDefined();
        expect(result.links.next).toBeDefined();
        expect(result.links.next.refresh).toBeDefined();

        return result;
    }

});

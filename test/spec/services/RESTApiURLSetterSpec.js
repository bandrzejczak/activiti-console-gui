'use strict';

describe('RESTApiURLSetter', function() {

    var REST_API_VALUE_NAME = 'RESTApiURL',
        REST_API_URL = 'http://example.com/',
        API_CALL = 'api/test',
        API_ABSOLUTE_CALL = REST_API_URL + API_CALL.substring(4),
        NON_API_CALL = 'test';

    var RESTApiURLSetter,
        mockHttp,
        http;

    beforeEach(module('activitiConsoleApp'));

    beforeEach(module(function($provide){
        $provide.value(REST_API_VALUE_NAME, REST_API_URL);
    }));

    beforeEach(inject(
        function (_RESTApiURLSetter_, $httpBackend, $http) {
            RESTApiURLSetter = _RESTApiURLSetter_;
            mockHttp = $httpBackend;
            http = $http;
        }));

    it('should be defined', function () {
        expect(RESTApiURLSetter).toBeDefined();
    });

    it('should point request to remote API when api/ prefix used', function () {
        //when
        http.get(API_CALL);

        //then
        mockHttp.expectGET(API_ABSOLUTE_CALL).respond(200);
        mockHttp.flush();
    });

    it('shouldnt interfere if api/ prefix isnt used', function (){
        //when
        http.get(NON_API_CALL);

        //then
        mockHttp.expectGET(NON_API_CALL).respond(200);
        mockHttp.flush();
    });

});
/**
 * Created by bandrzejczak on 11.10.14.
 */

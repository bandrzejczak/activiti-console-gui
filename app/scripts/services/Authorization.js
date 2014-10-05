'use strict';

/**
 * @ngdoc service
 * @name activitiConsoleApp.Authorization
 * @description
 * # Authorization
 * Service in the activitiConsoleApp.
 */
angular.module('activitiConsoleApp')
  .factory('Authorization', function ($http, $cookies) {
   return {
       login: function (login, password) {
           var auth = 'Basic ' + btoa(login + ':' + password);
           $http.defaults.headers.common.Authorization = auth;
           $cookies.Authorization = auth;
       },
       logout: function () {
           delete $http.defaults.headers.common.Authorization;
           delete $cookies.Authorization;
       }
   };
  });
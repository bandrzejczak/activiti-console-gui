'use strict';

/**
 * @ngdoc service
 * @name activitiConsoleApp.Auth
 * @description
 * # Auth
 * Service in the activitiConsoleApp.
 */
angular.module('activitiConsoleApp')
  .factory('Auth', function ($http, $cookies) {
   return {
       login: function (login, password) {
           var auth = 'Basic ' + btoa(login + ":" + password);
           $http.defaults.headers.common['Authorization'] = auth;
           $cookies.Authorization = auth;
       },
       logout: function () {
           delete $http.defaults.headers.common['Authorization'];
           delete $cookies['Authorization'];
       }
   }
  });
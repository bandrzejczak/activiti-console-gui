'use strict';

/**
 * @ngdoc service
 * @name activitiConsoleApp.Authorization
 * @description
 * # Authorization
 * Service in the activitiConsoleApp.
 */
angular.module('activitiConsoleApp')
    .provider('Authorization', {
        user: {},

        $get: function ($http, $cookies, $timeout, loginTimeout) {
            return {
                init: function () {
                    if ($cookies.Authorization) {
                        $http.defaults.headers.common.Authorization = $cookies.Authorization;
                    }
                },
                login: function (login, password) {
                    var auth = 'Basic ' + btoa(login + ':' + password);
                    $http.defaults.headers.common.Authorization = auth;
                    $cookies.Authorization = auth;
                    $timeout(this.logout, loginTimeout * 60000);
                },
                logout: function () {
                    delete $http.defaults.headers.common.Authorization;
                    delete $cookies.Authorization;
                },
                setAuthorizedUser: function (login, groups) {
                    this.user = {
                        login: login,
                        groups: groups
                    };
                },
                getUserLogin: function () {
                    return this.user.login;
                },
                userGroupsContain: function (group) {
                    return this.user.groups.indexOf(group) !== -1;
                }
            };
        }
    })
    .run(function (Authorization) {
        Authorization.init();
    });

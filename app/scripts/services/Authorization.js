'use strict';

/**
 * @ngdoc service
 * @name bpmConsoleApp.Authorization
 * @description
 * # Authorization
 * Service in the bpmConsoleApp.
 */
angular.module('bpmConsoleApp')
    .provider('Authorization', {
        user: {},

        $get: function ($http, $cookies, $timeout, loginTimeout) {
            var ADMIN_GROUP = 'admin';

            return {
                init: function () {
                    if ($cookies.Authorization) {
                        $http.defaults.headers.common.Authorization = $cookies.Authorization;
                    }
                    if ($cookies.AuthorizedUser) {
                        this.user = angular.fromJson($cookies.AuthorizedUser);
                    }
                },
                login: function (login, password) {
                    var auth = 'Basic ' + btoa(login + ':' + password);
                    $http.defaults.headers.common.Authorization = auth;
                    $cookies.Authorization = auth;
                    $timeout(this.logout.bind(this), loginTimeout * 60000);
                },
                logout: function () {
                    delete $http.defaults.headers.common.Authorization;
                    delete $cookies.Authorization;
                    delete $cookies.AuthorizedUser;
                    this.user = {};
                },
                setAuthorizedUser: function (login, groups) {
                    this.user = {
                        login: login,
                        groups: groups
                    };
                    $cookies.AuthorizedUser = angular.toJson(this.user);
                },
                getUserLogin: function () {
                    return this.user.login;
                },
                userGroupsContain: function (group) {
                    return this.user.groups.indexOf(group) !== -1;
                },
                isAdmin: function () {
                    return this.userGroupsContain(ADMIN_GROUP);
                }
            };
        }
    })
    .run(function (Authorization) {
        Authorization.init();
    });

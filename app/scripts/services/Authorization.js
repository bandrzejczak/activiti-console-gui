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

        $get: ['$http', 'ipCookie', '$timeout', 'loginTimeout', function ($http, ipCookie, $timeout, loginTimeout) {
            var ADMIN_GROUP = 'admin';
            var COOKIE_EXPIRATION = {expires: loginTimeout, expirationUnit: 'minutes'};

            return {
                init: function () {
                    if (ipCookie('Authorization')) {
                        $http.defaults.headers.common.Authorization = ipCookie('Authorization');
                    }
                    if (ipCookie('AuthorizedUser')) {
                        this.user = angular.fromJson(ipCookie('AuthorizedUser'));
                    }
                },
                login: function (login, password) {
                    var auth = 'Basic ' + btoa(login + ':' + password);
                    $http.defaults.headers.common.Authorization = auth;
                    ipCookie('Authorization', auth, COOKIE_EXPIRATION);
                    $timeout(this.logout.bind(this), loginTimeout * 60000);
                },
                logout: function () {
                    delete $http.defaults.headers.common.Authorization;
                    ipCookie.remove('Authorization');
                    ipCookie.remove('AuthorizedUser');
                    this.user = {};
                },
                setAuthorizedUser: function (login, groups) {
                    this.user = {
                        login: login,
                        groups: groups
                    };
                    ipCookie('AuthorizedUser', angular.toJson(this.user), COOKIE_EXPIRATION);
                },
                getUserLogin: function () {
                    return this.user.login;
                },
                userGroupsContain: function (group) {
                    return this.user && this.user.groups.map(function (g) {
                            return g.id;
                        }).indexOf(group) !== -1;
                },
                isAdmin: function () {
                    return this.userGroupsContain(ADMIN_GROUP);
                }
            };
        }]
    })
    .run(['Authorization', function (Authorization) {
        Authorization.init();
    }]);

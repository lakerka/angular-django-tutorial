(function () {
    'use strict';

    angular
        .module('thinkster.routes')
        .config(config);

    config.$inject = ['$routeProvider'];


    function config($routeProvider) {
        $routeProvider
            .when('/register', {
                controller: 'RegisterController',
                controllerAs: 'vm', // TODO what benefits do we get from vm syntax?
                templateUrl: '/static/templates/authentication/register.html'
            })
            .when('/login', {
                controller: 'LoginController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/authentication/login.html'
            })
            .otherwise('/')
    }
})();

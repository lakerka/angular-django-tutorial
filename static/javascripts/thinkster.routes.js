(function () {
    'use strict';

    angular
        .module('thinkster.routes')
        .config(config);

    config.$inject = ['$routeProvider'];


    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'IndexController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/layout/index.html'
            })
            .when('/register', {
                controller: 'RegisterController',
                // TODO what benefits do we get from vm syntax?
                // in nested controllers we could more easily specify controller from which we want to use
                // function or variable
                controllerAs: 'vm',
                templateUrl: '/static/templates/authentication/register.html'
            })
            .when('/login', {
                controller: 'LoginController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/authentication/login.html'
            })
            .when('/+:username', {
                controller: 'ProfileController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/profiles/profile.html'
            })
            .when('/+:username/settings', {
                controller: 'ProfileSettingsController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/profiles/settings.html'
            })
            .otherwise('/')
    }
})();

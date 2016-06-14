(function() {
    'use strict';

    angular
        .module('thinkster.authentification.services')
        .factory('Authentification', Authentification);

    Authentification.$inject = ['$cookies', '$http']

    function Authentification($cookies, $http) {
        var Authentification = {
            register: register
        };

        return Authentification;

        function register(username, password, email) {
            return $http.post('/api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            });
        }
    }
})();
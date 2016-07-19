(function () {
    'use strict';

    angular
        .module('thinkster.profiles.services')
        .factory('Profile', Profile);

    Profile.$inject = ['$http'];

    function Profile($http) {
        var Profile = {
            get: get,
            update: update,
            destroy: destroy,
        };

        return Profile;

        function get(username) {
            return $http.get('/api/v1/accounts/' + username + '/');
        }

        function update(profile) {
            return $http.put('/api/v1/accounts/' + profile.id + '/', profile);
        }

        function destroy(profile) {
            return $http.delete('/api/v1/accounts/' + profile.id + '/');
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('thinkster.profiles.controllers')
        .controller('ProfileSettingsController', ProfileSettingsController);

    ProfileSettingsController.$inject = ['$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar'];


    function ProfileSettingsController($location, $routeParams, Authentication, Profile, Snackbar) {
        var vm = this;

        vm.destroy = destroy;
        vm.update = update;

        activate();

        function activate() {
            var username, authenticatedAccount;

            username = $routeParams.username.substr(1);
            authenticatedAccount = Authentication.getAuthenticatedAccount();

            // redirect if not logged in
            if (!authenticatedAccount) {
                $location.url('/');
                Snackbar.error('You are not authorized to view this page.');
            } else {
                // redirect if logged in but not owner of this account
                if (authenticatedAccount.username !== username) {
                    $location.url('/');
                    Snackbar.error('You are not authorized to view this page.');
                }
            }

            Profile.get(username).then(profileSuccessFn, profileErrorFn);

            function profileSuccessFn(data, status, headers, config) {
                vm.profile = data.data;
            }

            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                Snackbar.error('That user does not exist.');
            }
        }

        function destroy() {
            Profile.destroy(vm.profile).then(profileSuccessFn, profileErrorFn);

            function profileSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();
                $location.url('/');
                Snackbar.show('Your account has been deleted.')
            }

            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                Snackbar.error('Failed to delete account. Error: ' + data.error);
            }
        }

        function update() {
            Profile.update(vm.profile).then(profileSuccessFn, profileErrorFn);

            function profileSuccessFn(data, status, headers, config) {
                Snackbar.show('Your account has been updated.')
            }

            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                Snackbar.error('Failed to update account. Error: ' + data.error);
            }
        }
    }
})();

(function () {
  'use strict';

  angular
    .module('thinkster.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentification'];


  function RegisterController($location, $scope, Authentification) {
      var vm = this;

      vm.register = register;

      function register() {
          Authentification.register(vm.email, vm.password, vm.username);
      }
  }
})();

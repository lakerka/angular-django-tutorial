(function () {
  'use strict';

  angular
    .module('thinkster.routes')
    .config(config);

  config.$inject = ['$routeProvider'];


  function config($routeProvider) {
      $routeProvider.when('/register', {
          controller: 'RegisterController',
          controllerAs: 'vm', // TODO ?
          templateUrl: '/static/templates/authentication/register.html'
      }).otherwise('/')
      // TOOD video from 12:16
  }
})();

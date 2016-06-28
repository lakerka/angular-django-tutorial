angular
    .module('thinkster', [
        'thinkster.config',
        'thinkster.routes',
        'thinkster.authentication'
    ]);

angular
    .module('thinkster.config', []);

angular
    .module('thinkster.routes', ['ngRoute']);

angular
    .module('thinkster')
    .run(run);

run.$inject = ['$http'];

function run($http) {
    // TODO how csrf works, why these token are needed, why use header and cookie?
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
}

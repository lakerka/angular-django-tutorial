angular
    .module('thinkster', [
        'thinkster.config',
        'thinkster.routes',
        'thinkster.authentication',
        'thinkster.layout',
        'thinkster.posts',
        'thinkster.utils',
        'thinkster.profiles',
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
    // how csrf works:
    // Where a POST form includes the csrf_token tag, and the view concerned passes RequestContext to the template,
    // requesting the page means Django includes a hidden form field which contains an alphanumeric string.
    // Django also returns to the browser a cookie with the name set to csrftoken and value set
    // to the same alphanumeric string.
    //
    // When receiving the form submission, Django checks that the alphanumeric string value
    // from the hidden form field matches and the csrftoken cookie received from the browser.
    // If they don't match a 403 response is issued.
    //
    // A CSRF attack might come in the form of a malicious web site that includes an iframe.
    // The iframe includes a POST form and some JavaScript. The form's action attribute points to my Django site.
    // The form is designed to do something nasty at my site, and the JS submits the form when the iframe is loaded.
    //
    // The browser would include the csrftoken cookie in the header of the form submission.
    // However, the form would not include the hidden field with the matching alphanumeric string,
    // so a 403 is returned and the attack fails. If the iframe JS tried to access the cookie, so as to
    // create the correct hiddden form field, the browser would prevent it from doing so.
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
}

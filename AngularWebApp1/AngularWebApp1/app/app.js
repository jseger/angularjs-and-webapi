
var app = angular.module('MainApp', [
    'ngRoute',
    'ngResource',
    'ngToast',
    'ang-drag-drop',
    'LocalStorageModule',
    'ui.bootstrap']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/home/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/forgot", {
        controller: "passwordResetController",
        templateUrl: "/app/views/passwordReset.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/products", {
        controller: "productsController",
        templateUrl: "/app/products/products.html"
    });

    $routeProvider.when("/products/:id", {
        controller: "productController",
        templateUrl: "/app/product/product.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "/app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "/app/views/associate.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

});

var serviceBase = 'http://localhost:50941/';
//var serviceBase = 'http://mywebapplication.net/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.factory('Page', function () {
    var title = 'default';
    return {
        title: function () { return title; },
        setTitle: function (newTitle) { title = newTitle; }
    };
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.run(['$rootScope','authService', function ($rootScope, authService) {
    authService.fillAuthData();

    $rootScope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }
}]);



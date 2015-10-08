'use strict';
app.controller('homeController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.authentication = authService.authentication;

    if (authService.authentication.isAuth) {
        $location.path('/products');
    }

    $scope.status = {
        helpActive: false
    };

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

}]);
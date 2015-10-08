'use strict';

app.controller('mainController', ['$scope', '$location', '$modal', 'authService', 'Page',
    function ($scope, $location, $modal, authService, Page) {

    $scope.Page = Page;
    Page.setTitle('Welcome');

    $scope.authentication = authService.authentication;

    $scope.status = {
        helpActive: false
    };


    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    $scope.showHelp = function () {
        $scope.status.helpActive = !$scope.status.helpActive;
    };

    $scope.$on('BUSY', function (event, title, message)
    {
        $scope.isBusy = true;

        $scope.busyModal = $modal.open({
            templateUrl: 'app/views/busyModal.html',
            controller: 'busyController',
            size: 'lg',
            resolve: {
                title: function () {
                    return title;
                },
                message: function () {
                    return message;
                }
            }
        });

    });

    $scope.$on('NOTBUSY', function ()
    {
        $scope.isBusy = false;
        $scope.busyModal.dismiss('cancel');
    });

}]);
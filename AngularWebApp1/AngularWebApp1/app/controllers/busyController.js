'use strict';
app.controller('busyController', ['$scope', '$modalInstance', 'title', 'message',
    function ($scope, $modalInstance, title, message) {

        $scope.title = title;
        $scope.message = message;

}])
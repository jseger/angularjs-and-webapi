'use strict';
app.controller('passwordResetController',
    ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {

        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.registration = {
            UserName: "",
            Email: "",
            Password: "",
            ConfirmPassword: ""
        };

        $scope.signUp = function () {
            $scope.$emit('BUSY', 'Saving...', 'One moment while we attempt to reset your password.');

            authService.resetPassword($scope.registration).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.message = "You have successfully reset your password.";
                startTimer();
                $scope.$emit('NOTBUSY');
            },
             function (response) {
                 var errors = [];
                 for (var key in response.data.ModelState) {
                     for (var i = 0; i < response.data.ModelState[key].length; i++) {
                         errors.push(response.data.ModelState[key][i]);
                     }
                 }
                 $scope.message = "Failed to reset password due to:" + errors.join(' ');
                 $scope.$emit('NOTBUSY');
             });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/login');
            }, 2000);
        }

    }]);
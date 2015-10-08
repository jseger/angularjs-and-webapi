'use strict';

app.controller('productsController', [
    '$http',
    '$scope',
    '$location',
    '$modal',
    '$timeout',
    'productsService',
    'ngToast',
    'Page',
    function ($http, $scope, $location, $modal, $timeout, productsService, ngToast, Page) {

        Page.setTitle('Products');
        $scope.products = [];

        $scope.showModal = false;

        $scope.newProduct =
            {
                Title: '',
                Price: ''
            };

        $scope.saveItem = function () {
            if ($scope.newProduct.Title !== '') {
                productsService.save($scope.newProduct, function (data) {
                    $scope.products.push(data);
                    $scope.newProduct.Title = '';
                    $scope.newProduct.Price = 0.00;
                    ngToast.create('New Product Created!');
                }, function (err) {
                });

            }
        };

        $scope.deleteItem = function (index, id) {
            productsService.delete({ id: id }, function (data) {
                $scope.products.splice(index, 1);
                ngToast.create({ 'class': 'warning', content: 'Product Deleted!', timeout: 10000, compileContent: true });
            }, function (err) {
            });
        };

        productsService.query(function (data) {
            $scope.products = data;
        });

    }]);
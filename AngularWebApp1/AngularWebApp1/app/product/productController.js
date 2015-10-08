'use strict';
app.controller('productController',
    ['$scope',
        '$routeParams',
        '$modal',
        '$sce',
        'Page',
        'ngToast',
        'productsService',
    function ($scope, $routeParams, $modal, $sce, Page, ngToast, productsService) {

        Page.setTitle('Product');

        var product_id = $routeParams.id;

        $scope.product = {};


        $scope.save = function () {
            productsService.update({ id: $scope.product.Id }, $scope.product, function (data) {
                $scope.product = data;
                ngToast.create('Saved!');
            }, function (err) {
                ngToast.create({ 'class': 'danger', content: "Error saving!" });
            });
        };

        $scope.getFile = function (id) {
            productsService.get({ id: id }, function (data) {
                $scope.product = data;
            });
        };

        $scope.getFile(product_id);

}]);
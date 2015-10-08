'use strict';
app.factory('productsService', ['$resource', 'ngAuthSettings', function ($resource, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    return $resource(serviceBase + 'api/Products/:id', null,
        {
            'update' : {method: 'PUT'}
        });

}]);
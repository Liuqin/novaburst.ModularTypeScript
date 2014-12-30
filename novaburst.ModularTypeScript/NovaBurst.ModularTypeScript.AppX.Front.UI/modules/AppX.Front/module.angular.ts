module NovaBurst.ModularTypeScript.AppX.Front {

    export var angularModuleName = 'NovaBurst.ModularTypeScript.AppX.Front';

    var angularModule = angular
        .module(angularModuleName,
        // dependencies
        [
            'ngRoute',
            NovaBurst.ModularTypeScript.AppX.Sales.angularModuleName
        ])
        .config([ '$routeProvider', function ($routeProvider: ng.route.IRouteProvider) {

            // configure router
            configureRouter($routeProvider);
        }]);


    // configure router
    function configureRouter($routeProvider: ng.route.IRouteProvider): void {

        $routeProvider
            .when('/account',
            {
                templateUrl: 'Views/Sales/Customer/Customer.html',
                controller: 'CustomerController'
            })
            .when('/',
            {
                templateUrl: 'Views/Sales/Products/Products.html',
                controller: 'ProductController'
            });
    }
}
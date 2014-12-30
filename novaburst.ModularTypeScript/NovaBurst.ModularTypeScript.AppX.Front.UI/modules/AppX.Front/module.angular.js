var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Front) {
                Front.angularModuleName = 'NovaBurst.ModularTypeScript.AppX.Front';

                var angularModule = angular.module(Front.angularModuleName, [
                    'ngRoute',
                    NovaBurst.ModularTypeScript.AppX.Sales.angularModuleName
                ]).config(function ($routeProvider) {
                    // configure router
                    configureRouter($routeProvider);
                });

                // configure router
                function configureRouter($routeProvider) {
                    $routeProvider.when('/account', {
                        templateUrl: 'Views/Sales/Customer/Customer.html',
                        controller: 'CustomerController'
                    }).when('/', {
                        templateUrl: 'Views/Sales/Products/Products.html',
                        controller: 'ProductController'
                    });
                }
            })(AppX.Front || (AppX.Front = {}));
            var Front = AppX.Front;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=module.angular.js.map

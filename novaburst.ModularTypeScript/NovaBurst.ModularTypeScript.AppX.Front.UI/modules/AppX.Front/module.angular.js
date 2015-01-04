var NovaBurst;
(function (NovaBurst) {
    var ModularTypeScript;
    (function (ModularTypeScript) {
        var AppX;
        (function (AppX) {
            var Front;
            (function (Front) {
                Front.angularModuleName = 'NovaBurst.ModularTypeScript.AppX.Front';
                var angularModule = angular.module(Front.angularModuleName, [
                    'ngRoute',
                    NovaBurst.ModularTypeScript.AppX.Sales.angularModuleName
                ]).config(['$routeProvider', function ($routeProvider) {
                    // configure router
                    configureRouter($routeProvider);
                }]);
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
            })(Front = AppX.Front || (AppX.Front = {}));
        })(AppX = ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=module.angular.js.map
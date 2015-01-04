var NovaBurst;
(function (NovaBurst) {
    var ModularTypeScript;
    (function (ModularTypeScript) {
        var AppX;
        (function (AppX) {
            var Sales;
            (function (Sales) {
                // base controller for all sales controllers
                var SalesControllerBase = (function () {
                    function SalesControllerBase($scope, $location) {
                        this.$scope = $scope;
                        this.$location = $location;
                        $scope['sales'] = this;
                    }
                    // go to customer account
                    SalesControllerBase.prototype.goToCustomer = function () {
                        this.$location.url('/account');
                    };
                    SalesControllerBase.prototype.goToProducts = function () {
                        this.$location.url('/');
                    };
                    return SalesControllerBase;
                })();
                Sales.SalesControllerBase = SalesControllerBase;
            })(Sales = AppX.Sales || (AppX.Sales = {}));
        })(AppX = ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=SalesControllerBase.js.map
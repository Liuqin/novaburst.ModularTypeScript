var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
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
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=SalesControllerBase.js.map

var NovaBurst;
(function (NovaBurst) {
    var ModularTypeScript;
    (function (ModularTypeScript) {
        var AppX;
        (function (AppX) {
            var Sales;
            (function (Sales) {
                var CustomerService = (function () {
                    function CustomerService(EntityService) {
                        this.EntityService = EntityService;
                        this.url = "/api/customer";
                    }
                    // get by ID
                    CustomerService.prototype.getById = function (id) {
                        return this.EntityService.getById(this.url, id);
                    };
                    return CustomerService;
                })();
                Sales.CustomerService = CustomerService;
                // register angular service
                angular.module(Sales.angularModuleName).service('CustomerService', ['EntityService', CustomerService]);
            })(Sales = AppX.Sales || (AppX.Sales = {}));
        })(AppX = ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=CustomerService.js.map
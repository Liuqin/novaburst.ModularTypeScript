var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
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
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=CustomerService.js.map

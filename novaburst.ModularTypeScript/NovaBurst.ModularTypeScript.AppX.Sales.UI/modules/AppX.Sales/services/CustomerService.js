var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Sales) {
                var Core = NovaBurst.ModularTypeScript.Core;

                var CustomerService = (function (_super) {
                    __extends(CustomerService, _super);
                    function CustomerService($q, $http) {
                        _super.call(this, $q, $http, '/api/customer');
                        this.$q = $q;
                        this.$http = $http;
                    }
                    return CustomerService;
                })(Core.EntityService);
                Sales.CustomerService = CustomerService;

                // register angular service
                angular.module(Sales.angularModuleName).service('CustomerService', CustomerService);
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=CustomerService.js.map

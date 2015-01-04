var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NovaBurst;
(function (NovaBurst) {
    var ModularTypeScript;
    (function (ModularTypeScript) {
        var AppX;
        (function (AppX) {
            var Sales;
            (function (Sales) {
                var CustomerController = (function (_super) {
                    __extends(CustomerController, _super);
                    /*
                     * Ctor.
                     * Inject CustomerService to handle customer related operations.
                     */
                    function CustomerController($scope, $location, CustomerService) {
                        _super.call(this, $scope, $location);
                        this.$scope = $scope;
                        this.$location = $location;
                        this.CustomerService = CustomerService;
                        var ctx = this;
                        // initialize
                        var initPromise = ctx.init();
                    }
                    // initialize
                    CustomerController.prototype.init = function () {
                        var ctx = this;
                        // get current customer
                        var customerPromise = ctx.CustomerService.getById("123");
                        customerPromise.then(function (customer) {
                            ctx.$scope.$applyAsync(function () {
                                ctx.currentCustomer = customer;
                            });
                        });
                        return customerPromise;
                    };
                    return CustomerController;
                })(Sales.SalesControllerBase);
                Sales.CustomerController = CustomerController;
                // register angular controller
                angular.module(Sales.angularModuleName).controller('CustomerController', ['$scope', '$location', 'CustomerService', CustomerController]);
            })(Sales = AppX.Sales || (AppX.Sales = {}));
        })(AppX = ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=CustomerController.js.map
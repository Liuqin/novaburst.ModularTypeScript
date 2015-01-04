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
                var Core = NovaBurst.ModularTypeScript.Core;
                var ProductController = (function (_super) {
                    __extends(ProductController, _super);
                    function ProductController($scope, $location, ProductService) {
                        _super.call(this, $scope, $location);
                        this.$scope = $scope;
                        this.$location = $location;
                        this.ProductService = ProductService;
                        var ctx = this;
                        var initPromise = ctx.init();
                    }
                    ProductController.prototype.init = function () {
                        var ctx = this;
                        // create paging options
                        var pagingOptions = new Core.PagingOptions().setSkip(25).setTake(25);
                        // create order options
                        var orderFields = [
                            { fieldName: 'id', ascending: true }
                        ];
                        var orderOptions = {
                            fields: orderFields
                        };
                        // get list of products
                        var prodPromise = ctx.ProductService.getPagedList(pagingOptions, orderOptions);
                        prodPromise.then(function (products) {
                            ctx.$scope.$applyAsync(function () {
                                ctx.products = products;
                            });
                        });
                        return prodPromise;
                    };
                    return ProductController;
                })(Sales.SalesControllerBase);
                Sales.ProductController = ProductController;
                // register angular controller
                angular.module(Sales.angularModuleName).controller('ProductController', ['$scope', '$location', 'ProductService', ProductController]);
            })(Sales = AppX.Sales || (AppX.Sales = {}));
        })(AppX = ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=ProductController.js.map
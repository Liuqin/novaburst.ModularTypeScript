var NovaBurst;
(function (NovaBurst) {
    var ModularTypeScript;
    (function (ModularTypeScript) {
        var AppX;
        (function (AppX) {
            var Sales;
            (function (Sales) {
                var ProductService = (function () {
                    function ProductService(EntityService) {
                        this.EntityService = EntityService;
                        this.url = "/api/product";
                    }
                    // get by ID
                    ProductService.prototype.getById = function (id) {
                        return this.EntityService.getById(this.url, id);
                    };
                    // GET - may yield multiple result types
                    ProductService.prototype.get = function (listOptions) {
                        return this.EntityService.get(this.url, listOptions);
                    };
                    // get count
                    ProductService.prototype.getCount = function () {
                        return this.EntityService.getCount(this.url);
                    };
                    // get list
                    ProductService.prototype.getList = function (pagingOptions, orderOptions) {
                        return this.EntityService.getList(this.url, pagingOptions, orderOptions);
                    };
                    // get paged list
                    ProductService.prototype.getPagedList = function (pagingOptions, orderOptions) {
                        return this.EntityService.getPagedList(this.url, pagingOptions, orderOptions);
                    };
                    return ProductService;
                })();
                Sales.ProductService = ProductService;
                // register angular service
                angular.module(Sales.angularModuleName).service('ProductService', ['EntityService', ProductService]);
            })(Sales = AppX.Sales || (AppX.Sales = {}));
        })(AppX = ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=ProductService.js.map
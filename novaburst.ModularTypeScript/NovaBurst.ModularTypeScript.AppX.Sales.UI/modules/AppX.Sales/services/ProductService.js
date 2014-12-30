var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
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
                angular.module(Sales.angularModuleName).service('ProductService', ProductService);
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=ProductService.js.map

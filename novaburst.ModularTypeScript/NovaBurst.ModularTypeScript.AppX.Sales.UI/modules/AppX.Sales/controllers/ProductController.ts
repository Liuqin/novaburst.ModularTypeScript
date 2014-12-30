module NovaBurst.ModularTypeScript.AppX.Sales {

    import Core = NovaBurst.ModularTypeScript.Core;

    export class ProductController extends SalesControllerBase {

        public products: Core.PagedList<Product>;

        constructor(
            public $scope: ng.IScope,
            public $location: ng.ILocationService,
            private ProductService: IProductService) {

            super($scope, $location);

            var ctx = this;

            var initPromise = ctx.init();
        }

        private init(): ng.IPromise<any> {

            var ctx = this;

            // create paging options
            var pagingOptions: Core.PagingOptions = new Core.PagingOptions().setSkip(25).setTake(25);
            

            // create order options
            var orderFields: Core.OrderOptionsField[] =
                [
                    { fieldName: 'id', ascending: true }
                ];

            var orderOptions: Core.OrderOptions =
                {
                    fields: orderFields
                };

            // get list of products
            var prodPromise = ctx.ProductService.getPagedList(pagingOptions, orderOptions);

            prodPromise.then(function (products) {
                ctx.products = products;
            });

            return prodPromise;
        }
    }


    // register angular controller
    angular.module(angularModuleName).controller('ProductController', ['$scope', '$location', 'ProductService', ProductController]);
} 
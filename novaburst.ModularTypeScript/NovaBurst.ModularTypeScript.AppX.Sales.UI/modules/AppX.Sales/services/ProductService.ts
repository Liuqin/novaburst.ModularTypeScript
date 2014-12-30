module NovaBurst.ModularTypeScript.AppX.Sales {

    import Core = NovaBurst.ModularTypeScript.Core;

    export class ProductService {

        private url: string = "/api/product";

        constructor(
            private EntityService: Core.IEntityService<Product>) {
        }


        // get by ID
        public getById(id: string): ng.IPromise<Product> {
            return this.EntityService.getById(this.url, id);
        }

        // GET - may yield multiple result types
        public get(listOptions: Core.ListOptions): ng.IPromise<any> {
            return this.EntityService.get(this.url, listOptions);
        }

        // get count
        public getCount(): ng.IPromise<number> {
            return this.EntityService.getCount(this.url);
        }

        // get list
        public getList(pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<Product[]> {
            return this.EntityService.getList(this.url, pagingOptions, orderOptions);
        }

        // get paged list
        public getPagedList(pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<Core.PagedList<Product>> {
            return this.EntityService.getPagedList(this.url, pagingOptions, orderOptions);
        }
    }


    // register angular service
    angular.module(angularModuleName).service('ProductService', ProductService);
}
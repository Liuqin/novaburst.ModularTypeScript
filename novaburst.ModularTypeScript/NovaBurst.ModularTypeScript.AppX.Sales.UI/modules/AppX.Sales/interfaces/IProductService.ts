module NovaBurst.ModularTypeScript.AppX.Sales {

    import Core = NovaBurst.ModularTypeScript.Core;

    export interface IProductService {

        // get by ID
        getById(id: string): ng.IPromise<Product>;

        // GET - may yield multiple result types
        get(listOptions: Core.ListOptions): ng.IPromise<any>;

        // get count
        getCount(): ng.IPromise<number>;

        // get list
        getList(pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<Product[]>;

        // get paged list
        getPagedList(pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<Core.PagedList<Product>>;
    }
} 
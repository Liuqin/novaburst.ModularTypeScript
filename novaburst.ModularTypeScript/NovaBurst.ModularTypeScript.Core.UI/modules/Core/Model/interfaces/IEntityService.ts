module NovaBurst.ModularTypeScript.Core {

    export interface IEntityService<TEntity> {

        // get by ID
        getById(url: string, id: string): ng.IPromise<TEntity>;

        // GET - may yield multiple result types
        get(url: string, listOptions: Core.ListOptions): ng.IPromise<any>;

        // GET - may yield multiple result types
        getFiltered<TFilter>(url: string, filter: TFilter, listOptions: Core.ListOptions): ng.IPromise<any>;

        // get count
        getCount(url: string): ng.IPromise<number>;

        // get count
        getCountFiltered<TFilter>(url: string, filter: TFilter): ng.IPromise<number>;

        // get list
        getList(url: string, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<TEntity[]>;

        // get list
        getListFiltered<TFilter>(url: string, filter: TFilter, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<TEntity[]>;

        // get paged list
        getPagedList(url: string, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<Core.PagedList<TEntity>>;

        // get paged list
        getPagedListFiltered<TFilter>(url: string, filter: TFilter, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<Core.PagedList<TEntity>>;
    }
}
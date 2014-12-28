module NovaBurst.ModularTypeScript.Core {

    export interface IEntityService<TEntity> {

        // get person by ID
        getById(id: string): ng.IPromise<TEntity>;

        // GET - may yield multiple result types
        get(listOptions: Core.ListOptions): ng.IPromise<any>;

        // GET - may yield multiple result types
        getFiltered<TFilter>(filter: TFilter, listOptions: Core.ListOptions): ng.IPromise<any>;

        // get persons count
        getCount(): ng.IPromise<number>;

        // get persons count
        getCountFiltered<TFilter>(filter: TFilter): ng.IPromise<number>;

        // get persons
        getList(pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<TEntity[]>;

        // get persons
        getListFiltered<TFilter>(filter: TFilter, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<TEntity[]>;

        // get paged list of persons
        getPagedList<TFilter>(filter: TFilter, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<Core.PagedList<TEntity>>;
    }
}
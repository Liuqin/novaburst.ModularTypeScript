module NovaBurst.ModularTypeScript.Core {

    export class EntityService<TEntity> implements IEntityService<TEntity> {

        /*
         * url = resource URL that corresponds to the requested entity and which service is REST based
         */
        constructor(
            public $q: ng.IQService,
            public $http: ng.IHttpService,
            public url: string) {
        }

        // get person by ID
        public getById(id: string): ng.IPromise<TEntity> {
            var ctx = this;
            var url = url + '/' + id;
            var promise = ctx.$http.get(url);
            return promise;
        }

        // GET - may yield multiple result types
        public get(listOptions: Core.ListOptions): ng.IPromise<any> {
            var ctx = this;
            var promise = ctx.getFiltered<any>(null, listOptions);
            return promise;
        }

        // GET - may yield multiple result types
        public getFiltered<TFilter>(filter: TFilter, listOptions: Core.ListOptions): ng.IPromise<any> {
            var ctx = this;
            var url = this.url;
            var paramsObj = !filter ? listOptions : $.extend(true, {}, listOptions, filter);
            var params = $.param(paramsObj);
            url = url + params;
            var promise = ctx.$http.get(url);
            return promise;
        }

        // get persons count
        public getCount(): ng.IPromise<number> {
            var ctx = this;
            var promise = ctx.getCountFiltered<any>(null);
            return promise;
        }

        // get persons count
        public getCountFiltered<TFilter>(filter: TFilter): ng.IPromise<number> {
            var ctx = this;
            var listOptions = new Core.ListOptions();
            listOptions.fetchCount = true;
            var promise = ctx.getFiltered<TFilter>(filter, listOptions);
            return promise;
        }

        // get persons
        public getList(pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<TEntity[]> {
            var ctx = this;
            var promise = ctx.getListFiltered<any>(null, pagingOptions, orderOptions);
            return promise;
        }

        // get persons
        public getListFiltered<TFilter>(filter: TFilter, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<TEntity[]> {
            var ctx = this;
            var listOptions = new Core.ListOptions();
            listOptions.pagingOptions = pagingOptions;
            listOptions.orderOptions = orderOptions;
            var promise = ctx.getFiltered(filter, listOptions);
            return promise;
        }

        // get paged list of persons
        public getPagedList<TFilter>(filter: TFilter, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<Core.PagedList<TEntity>> {
            var ctx = this;

            // get count
            var countPromise = ctx.getCountFiltered(filter);

            // get list
            var listPromise = ctx.getListFiltered(filter, pagingOptions, orderOptions);

            // create paged list from promise results
            var pagedListPromise = PagedList.fromPromises(ctx.$q, countPromise, listPromise, pagingOptions);

            return pagedListPromise;
        }
    }
} 
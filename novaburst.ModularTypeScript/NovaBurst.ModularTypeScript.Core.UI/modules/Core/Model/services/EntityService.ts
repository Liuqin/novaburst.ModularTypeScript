module NovaBurst.ModularTypeScript.Core {

    export class EntityService<TEntity> implements IEntityService<TEntity> {

        /*
         * url = resource URL that corresponds to the requested entity and which service is REST based
         */
        constructor(
            public $q: ng.IQService,
            public $http: ng.IHttpService) {
        }

        // get by ID
        public getById(url: string, id: string): ng.IPromise<TEntity> {
            var ctx = this;
            var url = url + '/' + id;
            var promise = ctx.$http.get(url);
            return ctx.httpPromiseToPromise(promise);
        }

        // GET - may yield multiple result types
        public get(url: string, listOptions: Core.ListOptions): ng.IPromise<any> {
            var ctx = this;
            var promise = ctx.getFiltered<any>(url, null, listOptions);
            return promise;
        }

        // GET - may yield multiple result types
        public getFiltered<TFilter>(url: string, filter: TFilter, listOptions: Core.ListOptions): ng.IPromise<any> {
            var ctx = this;
            var paramsObj = !filter ? { listOptions: listOptions } : $.extend(true, {}, { listOptions: listOptions }, filter);
            var params = $.param(paramsObj);
            url = url + '?' + params;
            var promise = ctx.$http.get(url);
            return ctx.httpPromiseToPromise(promise);
        }

        // get count
        public getCount(url: string): ng.IPromise<number> {
            var ctx = this;
            var promise = ctx.getCountFiltered<any>(url, null);
            return promise;
        }

        // get count
        public getCountFiltered<TFilter>(url: string, filter: TFilter): ng.IPromise<number> {
            var ctx = this;
            var listOptions = new Core.ListOptions();
            listOptions.fetchCount = true;
            var promise = ctx.getFiltered<TFilter>(url, filter, listOptions);
            return promise;
        }

        // get list
        public getList(url: string, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<TEntity[]> {
            var ctx = this;
            var promise = ctx.getListFiltered<any>(url, null, pagingOptions, orderOptions);
            return promise;
        }

        // get list
        public getListFiltered<TFilter>(url: string, filter: TFilter, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<TEntity[]> {
            var ctx = this;
            var listOptions = new Core.ListOptions();
            listOptions.pagingOptions = pagingOptions;
            listOptions.orderOptions = orderOptions;
            var promise = ctx.getFiltered(url, filter, listOptions);
            return promise;
        }

        // get paged list
        public getPagedList(url: string, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<Core.PagedList<TEntity>> {
            var ctx = this;

            // get count
            var countPromise = ctx.getCount(url);

            // get list
            var listPromise = ctx.getList(url, pagingOptions, orderOptions);

            // create paged list from promise results
            var pagedListPromise = PagedList.fromPromises(ctx.$q, countPromise, listPromise, pagingOptions);

            return pagedListPromise;
        }

        // get paged list
        public getPagedListFiltered<TFilter>(url: string, filter: TFilter, pagingOptions: Core.PagingOptions, orderOptions: Core.OrderOptions): ng.IPromise<Core.PagedList<TEntity>> {
            var ctx = this;

            // get count
            var countPromise = ctx.getCountFiltered(url, filter);

            // get list
            var listPromise = ctx.getListFiltered(url, filter, pagingOptions, orderOptions);

            // create paged list from promise results
            var pagedListPromise = PagedList.fromPromises(ctx.$q, countPromise, listPromise, pagingOptions);

            return pagedListPromise;
        }

        private httpPromiseToPromise(promise: ng.IHttpPromise<any>): ng.IPromise<any> {
            var def = this.$q.defer();

            promise.then(
                // success
                function (res) {
                    def.resolve(res.data);
                },
                // error
                function () {
                    def.reject.apply(def, arguments);
                });

            return def.promise;
        }
    }


    // register angular service
    angular.module(angularModuleName).service('EntityService', EntityService);
}
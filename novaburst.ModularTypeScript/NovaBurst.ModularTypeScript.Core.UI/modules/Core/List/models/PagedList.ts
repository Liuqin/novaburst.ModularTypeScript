module NovaBurst.ModularTypeScript.Core {

    export class PagedList<T> {

        /*
         * Ctor.
         * items = list of entities
         * itemsCount = total number of entities
         * pagingOptions = options used to determine current paged list
         */
        constructor(
            public items: T[],
            public itemsCount: number,
            public pagingOptions: PagingOptions) {
        }

        /*
         * Get number of pages.
         */
        public getPageCount(): number {
            if (!this.pagingOptions.take) {
                return 0;
            }

            return Math.ceil(this.itemsCount / this.pagingOptions.take);
        }

        /*
         * Get paged list from promises.
         * $q = service for handling promises and deferred execution
         * countPromise = promise that resolves to the count of entities
         * listPromise = promise that resolves to the list of entities
         */
        public static fromPromises<T>($q: ng.IQService, countPromise: ng.IPromise<number>, listPromise: ng.IPromise<T[]>, pagingOptions: PagingOptions): ng.IPromise<PagedList<T>> {

            var def = $q.defer();

            // get entity count
            var count: number;
            countPromise.then(function (cnt) {
                count = cnt;
            });

            // get list of entities
            var list: T[];
            listPromise.then(function (lst) {
                list = lst;
            });

            // sync both promises
            $q.all([countPromise, listPromise]).then(
                // success
                function () {

                    // create paged list
                    var pagedList = new PagedList(list, count, pagingOptions);
                    def.resolve(pagedList);
                },
                // error
                function (reason) {
                    def.reject(reason);
                });

            return def.promise;
        }
    }
}
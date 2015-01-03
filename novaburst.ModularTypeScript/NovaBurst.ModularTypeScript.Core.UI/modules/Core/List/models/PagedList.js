var NovaBurst;
(function (NovaBurst) {
    var ModularTypeScript;
    (function (ModularTypeScript) {
        var Core;
        (function (Core) {
            var PagedList = (function () {
                /*
                 * Ctor.
                 * items = list of entities
                 * itemsCount = total number of entities
                 * pagingOptions = options used to determine current paged list
                 */
                function PagedList(items, itemsCount, pagingOptions) {
                    this.items = items;
                    this.itemsCount = itemsCount;
                    this.pagingOptions = pagingOptions;
                }
                /*
                 * Get number of pages.
                 */
                PagedList.prototype.getPageCount = function () {
                    if (!this.pagingOptions.take) {
                        return 0;
                    }
                    return Math.ceil(this.itemsCount / this.pagingOptions.take);
                };
                /*
                 * Get paged list from promises.
                 * $q = service for handling promises and deferred execution
                 * countPromise = promise that resolves to the count of entities
                 * listPromise = promise that resolves to the list of entities
                 */
                PagedList.fromPromises = function ($q, countPromise, listPromise, pagingOptions) {
                    var def = $q.defer();
                    // get entity count
                    var count;
                    countPromise.then(function (cnt) {
                        count = cnt;
                    });
                    // get list of entities
                    var list;
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
                };
                return PagedList;
            })();
            Core.PagedList = PagedList;
        })(Core = ModularTypeScript.Core || (ModularTypeScript.Core = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=PagedList.js.map
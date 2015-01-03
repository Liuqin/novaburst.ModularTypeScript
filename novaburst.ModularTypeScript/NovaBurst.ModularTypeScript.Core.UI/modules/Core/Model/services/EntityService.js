var NovaBurst;
(function (NovaBurst) {
    var ModularTypeScript;
    (function (ModularTypeScript) {
        var Core;
        (function (Core) {
            var EntityService = (function () {
                /*
                 * url = resource URL that corresponds to the requested entity and which service is REST based
                 */
                function EntityService($q, $http) {
                    this.$q = $q;
                    this.$http = $http;
                }
                // get by ID
                EntityService.prototype.getById = function (url, id) {
                    var ctx = this;
                    var url = url + '/' + id;
                    var promise = ctx.$http.get(url);
                    return ctx.httpPromiseToPromise(promise);
                };
                // GET - may yield multiple result types
                EntityService.prototype.get = function (url, listOptions) {
                    var ctx = this;
                    var promise = ctx.getFiltered(url, null, listOptions);
                    return promise;
                };
                // GET - may yield multiple result types
                EntityService.prototype.getFiltered = function (url, filter, listOptions) {
                    var ctx = this;
                    var paramsObj = !filter ? { listOptions: listOptions } : $.extend(true, {}, { listOptions: listOptions }, filter);
                    var params = $.param(paramsObj);
                    url = url + '?' + params;
                    var promise = ctx.$http.get(url);
                    return ctx.httpPromiseToPromise(promise);
                };
                // get count
                EntityService.prototype.getCount = function (url) {
                    var ctx = this;
                    var promise = ctx.getCountFiltered(url, null);
                    return promise;
                };
                // get count
                EntityService.prototype.getCountFiltered = function (url, filter) {
                    var ctx = this;
                    var listOptions = new Core.ListOptions();
                    listOptions.fetchCount = true;
                    var promise = ctx.getFiltered(url, filter, listOptions);
                    return promise;
                };
                // get list
                EntityService.prototype.getList = function (url, pagingOptions, orderOptions) {
                    var ctx = this;
                    var promise = ctx.getListFiltered(url, null, pagingOptions, orderOptions);
                    return promise;
                };
                // get list
                EntityService.prototype.getListFiltered = function (url, filter, pagingOptions, orderOptions) {
                    var ctx = this;
                    var listOptions = new Core.ListOptions();
                    listOptions.pagingOptions = pagingOptions;
                    listOptions.orderOptions = orderOptions;
                    var promise = ctx.getFiltered(url, filter, listOptions);
                    return promise;
                };
                // get paged list
                EntityService.prototype.getPagedList = function (url, pagingOptions, orderOptions) {
                    var ctx = this;
                    // get count
                    var countPromise = ctx.getCount(url);
                    // get list
                    var listPromise = ctx.getList(url, pagingOptions, orderOptions);
                    // create paged list from promise results
                    var pagedListPromise = Core.PagedList.fromPromises(ctx.$q, countPromise, listPromise, pagingOptions);
                    return pagedListPromise;
                };
                // get paged list
                EntityService.prototype.getPagedListFiltered = function (url, filter, pagingOptions, orderOptions) {
                    var ctx = this;
                    // get count
                    var countPromise = ctx.getCountFiltered(url, filter);
                    // get list
                    var listPromise = ctx.getListFiltered(url, filter, pagingOptions, orderOptions);
                    // create paged list from promise results
                    var pagedListPromise = Core.PagedList.fromPromises(ctx.$q, countPromise, listPromise, pagingOptions);
                    return pagedListPromise;
                };
                EntityService.prototype.httpPromiseToPromise = function (promise) {
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
                };
                return EntityService;
            })();
            Core.EntityService = EntityService;
            // register angular service
            angular.module(Core.angularModuleName).service('EntityService', ['$q', '$http', EntityService]);
        })(Core = ModularTypeScript.Core || (ModularTypeScript.Core = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=EntityService.js.map
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (Core) {
            var EntityService = (function () {
                /*
                * url = resource URL that corresponds to the requested entity and which service is REST based
                */
                function EntityService($q, $http, url) {
                    this.$q = $q;
                    this.$http = $http;
                    this.url = url;
                }
                // get person by ID
                EntityService.prototype.getById = function (id) {
                    var ctx = this;
                    var url = url + '/' + id;
                    var promise = ctx.$http.get(url);
                    return promise;
                };

                // GET - may yield multiple result types
                EntityService.prototype.get = function (listOptions) {
                    var ctx = this;
                    var promise = ctx.getFiltered(null, listOptions);
                    return promise;
                };

                // GET - may yield multiple result types
                EntityService.prototype.getFiltered = function (filter, listOptions) {
                    var ctx = this;
                    var url = this.url;
                    var paramsObj = !filter ? listOptions : $.extend(true, {}, listOptions, filter);
                    var params = $.param(paramsObj);
                    url = url + params;
                    var promise = ctx.$http.get(url);
                    return promise;
                };

                // get persons count
                EntityService.prototype.getCount = function () {
                    var ctx = this;
                    var promise = ctx.getCountFiltered(null);
                    return promise;
                };

                // get persons count
                EntityService.prototype.getCountFiltered = function (filter) {
                    var ctx = this;
                    var listOptions = new Core.ListOptions();
                    listOptions.fetchCount = true;
                    var promise = ctx.getFiltered(filter, listOptions);
                    return promise;
                };

                // get persons
                EntityService.prototype.getList = function (pagingOptions, orderOptions) {
                    var ctx = this;
                    var promise = ctx.getListFiltered(null, pagingOptions, orderOptions);
                    return promise;
                };

                // get persons
                EntityService.prototype.getListFiltered = function (filter, pagingOptions, orderOptions) {
                    var ctx = this;
                    var listOptions = new Core.ListOptions();
                    listOptions.pagingOptions = pagingOptions;
                    listOptions.orderOptions = orderOptions;
                    var promise = ctx.getFiltered(filter, listOptions);
                    return promise;
                };

                // get paged list of persons
                EntityService.prototype.getPagedList = function (filter, pagingOptions, orderOptions) {
                    var ctx = this;

                    // get count
                    var countPromise = ctx.getCountFiltered(filter);

                    // get list
                    var listPromise = ctx.getListFiltered(filter, pagingOptions, orderOptions);

                    // create paged list from promise results
                    var pagedListPromise = Core.PagedList.fromPromises(ctx.$q, countPromise, listPromise, pagingOptions);

                    return pagedListPromise;
                };
                return EntityService;
            })();
            Core.EntityService = EntityService;
        })(ModularTypeScript.Core || (ModularTypeScript.Core = {}));
        var Core = ModularTypeScript.Core;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=EntityService.js.map

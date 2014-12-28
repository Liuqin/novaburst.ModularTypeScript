var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (Core) {
            var PagingOptions = (function () {
                function PagingOptions() {
                }
                PagingOptions.prototype.getPageSize = function () {
                    return this.take;
                };

                PagingOptions.prototype.getPageIndex = function () {
                    if (!this.take)
                        return 1;

                    return Math.floor(this.skip / this.take) + 1;
                };
                return PagingOptions;
            })();
            Core.PagingOptions = PagingOptions;
        })(ModularTypeScript.Core || (ModularTypeScript.Core = {}));
        var Core = ModularTypeScript.Core;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=PagingOptions.js.map

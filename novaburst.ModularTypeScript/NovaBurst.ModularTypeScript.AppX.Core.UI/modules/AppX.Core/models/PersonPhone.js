var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Core) {
                var PersonPhone = (function (_super) {
                    __extends(PersonPhone, _super);
                    function PersonPhone() {
                        _super.apply(this, arguments);
                    }
                    return PersonPhone;
                })(Core.Phone);
                Core.PersonPhone = PersonPhone;
            })(AppX.Core || (AppX.Core = {}));
            var Core = AppX.Core;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=PersonPhone.js.map

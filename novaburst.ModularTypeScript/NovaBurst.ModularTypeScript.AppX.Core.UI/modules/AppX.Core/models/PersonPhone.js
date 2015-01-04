var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NovaBurst;
(function (NovaBurst) {
    var ModularTypeScript;
    (function (ModularTypeScript) {
        var AppX;
        (function (AppX) {
            var Core;
            (function (Core) {
                var PersonPhone = (function (_super) {
                    __extends(PersonPhone, _super);
                    function PersonPhone() {
                        _super.apply(this, arguments);
                    }
                    return PersonPhone;
                })(Core.Phone);
                Core.PersonPhone = PersonPhone;
            })(Core = AppX.Core || (AppX.Core = {}));
        })(AppX = ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=PersonPhone.js.map
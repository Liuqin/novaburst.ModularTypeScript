var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (Person) {
            var PersonAddress = (function (_super) {
                __extends(PersonAddress, _super);
                function PersonAddress() {
                    _super.apply(this, arguments);
                }
                return PersonAddress;
            })(ModularTypeScript.Core.Address);
            Person.PersonAddress = PersonAddress;
        })(ModularTypeScript.Person || (ModularTypeScript.Person = {}));
        var Person = ModularTypeScript.Person;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=PersonAddress.js.map

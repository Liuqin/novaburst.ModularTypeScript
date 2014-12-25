var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (Person) {
            (function (PersonPhoneType) {
                PersonPhoneType[PersonPhoneType["Home"] = 1] = "Home";
                PersonPhoneType[PersonPhoneType["Work"] = 2] = "Work";
            })(Person.PersonPhoneType || (Person.PersonPhoneType = {}));
            var PersonPhoneType = Person.PersonPhoneType;
        })(ModularTypeScript.Person || (ModularTypeScript.Person = {}));
        var Person = ModularTypeScript.Person;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=PersonPhoneType.js.map

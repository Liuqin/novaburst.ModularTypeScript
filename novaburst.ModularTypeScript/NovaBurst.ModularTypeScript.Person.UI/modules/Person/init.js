/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/init.ts" />
/// <reference path="models/Person.ts" />
/// <reference path="models/PersonAddress.ts" />
/// <reference path="models/PersonPhone.ts" />
/// <reference path="models/PersonPhoneType.ts" />
define(["require", "exports", '../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/init', '../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/utility/Module'], function(require, exports, Core, Module) {
    Core;

    Module.ModuleLoader.loadModule('Person', 'NovaBurst.ModularTypeScript.Person');

    var Person = NovaBurst.ModularTypeScript.Person;
    
    return Person;
});
//# sourceMappingURL=init.js.map

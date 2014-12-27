/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/init.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/init.ts" />
/// <reference path="models/Customer.ts" />
define(["require", "exports", '../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/init', '../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/init', '../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/utility/Module'], function(require, exports, Core, Person, Module) {
    Core;
    Person;

    Module.ModuleLoader.loadModule('Sales', 'NovaBurst.ModularTypeScript.Sales');

    var Sales = NovaBurst.ModularTypeScript.Sales;
    
    return Sales;
});
//# sourceMappingURL=init.js.map

/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/init.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/init.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Sales.UI/modules/Sales/init.ts" />
/// <reference path="controllers/FrontController.ts" />
define(["require", "exports", '../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/init', '../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/init', '../../../NovaBurst.ModularTypeScript.Sales.UI/modules/Sales/init', '../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/utility/Module'], function(require, exports, Core, Person, Sales, Module) {
    Core;
    Person;
    Sales;

    Module.ModuleLoader.loadModule('Front', 'NovaBurst.ModularTypeScript.Front');

    var Front = NovaBurst.ModularTypeScript.Front;
    
    return Front;
});
//# sourceMappingURL=init.js.map

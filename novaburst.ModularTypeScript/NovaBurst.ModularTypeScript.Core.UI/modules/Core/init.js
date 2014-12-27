/// <reference path="models/Address.ts" />
/// <reference path="models/Phone.ts" />
/// <reference path="utility/Module.ts" />
define(["require", "exports", './utility/Module'], function(require, exports, Module) {
    Module.ModuleLoader.loadModule('Core', 'NovaBurst.ModularTypeScript.Core');

    var Core = NovaBurst.ModularTypeScript.Core;
    
    return Core;
});
//# sourceMappingURL=init.js.map

/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/ModuleInit.ts" />
define(["require", "exports", '../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit', '../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/ModuleInit'], function(require, exports, Core, Person) {
    var NovaBurst;
    (function (NovaBurst) {
        (function (ModularTypeScript) {
            /// <reference path="models/Customer.ts" />
            (function (Sales) {
                var ModuleInit = (function () {
                    function ModuleInit() {
                    }
                    return ModuleInit;
                })();
                Sales.ModuleInit = ModuleInit;
            })(ModularTypeScript.Sales || (ModularTypeScript.Sales = {}));
            var Sales = ModularTypeScript.Sales;
        })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
        var ModularTypeScript = NovaBurst.ModularTypeScript;
    })(NovaBurst || (NovaBurst = {}));

    Core;
    Person;

    var Sales = NovaBurst.ModularTypeScript.Sales;
    

    var salesModuleName = 'NovaBurst.ModularTypeScript.Sales';

    // load external libraries
    require(['scripts/angular'], function () {
        // register Angular module
        angular.module(salesModuleName, []);

        // load module scripts
        require(['./models/Customer'], function () {
        }, function () {
            // handle module load err
        });
    }, function () {
        // handle module load err
    });
    return Sales;
});
//# sourceMappingURL=ModuleInit.js.map

/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/ModuleInit.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Sales.UI/modules/Sales/ModuleInit.ts" />
define(["require", "exports", '../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit', '../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/ModuleInit', '../../../NovaBurst.ModularTypeScript.Sales.UI/modules/Sales/ModuleInit'], function(require, exports, Core, Person, Sales) {
    var NovaBurst;
    (function (NovaBurst) {
        (function (ModularTypeScript) {
            /// <reference path="controllers/FrontController.ts" />
            (function (Front) {
                var ModuleInit = (function () {
                    function ModuleInit() {
                    }
                    return ModuleInit;
                })();
                Front.ModuleInit = ModuleInit;
            })(ModularTypeScript.Front || (ModularTypeScript.Front = {}));
            var Front = ModularTypeScript.Front;
        })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
        var ModularTypeScript = NovaBurst.ModularTypeScript;
    })(NovaBurst || (NovaBurst = {}));

    Core;
    Person;
    Sales;

    var Front = NovaBurst.ModularTypeScript.Front;
    

    var frontModuleName = 'NovaBurst.ModularTypeScript.Front';

    // load external libraries
    require(['scripts/angular'], function () {
        // register Angular module
        angular.module(frontModuleName, []);

        // load module scripts
        require([
            './controllers/FrontController'
        ], function () {
        }, function () {
            // handle module load err
        });
    }, function () {
        // handle module load err
    });
    return Front;
});
//# sourceMappingURL=ModuleInit.js.map

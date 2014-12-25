/// <reference path="models/Address.ts" />
/// <reference path="models/Phone.ts" />
define(["require", "exports"], function(require, exports) {
    var NovaBurst;
    (function (NovaBurst) {
        (function (ModularTypeScript) {
            (function (Core) {
                var ModuleInit = (function () {
                    function ModuleInit() {
                    }
                    return ModuleInit;
                })();
                Core.ModuleInit = ModuleInit;
            })(ModularTypeScript.Core || (ModularTypeScript.Core = {}));
            var Core = ModularTypeScript.Core;
        })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
        var ModularTypeScript = NovaBurst.ModularTypeScript;
    })(NovaBurst || (NovaBurst = {}));

    var Core = NovaBurst.ModularTypeScript.Core;
    

    var coreModuleName = 'NovaBurst.ModularTypeScript.Core';

    // load external libraries
    require(['scripts/angular'], function () {
        // register Angular module
        angular.module(coreModuleName, []);

        // load module scripts
        require([
            './models/Address',
            './models/Phone'], function () {
        }, function () {
            // handle module load err
        });
    }, function () {
        // handle module load err
    });
    return Core;
});
//# sourceMappingURL=ModuleInit.js.map

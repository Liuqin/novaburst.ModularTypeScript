/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit.ts" />
define(["require", "exports", '../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit'], function(require, exports, Core) {
    var NovaBurst;
    (function (NovaBurst) {
        (function (ModularTypeScript) {
            /// <reference path="models/Person.ts" />
            /// <reference path="models/PersonAddress.ts" />
            /// <reference path="models/PersonPhone.ts" />
            /// <reference path="models/PersonPhoneType.ts" />
            (function (Person) {
                var ModuleInit = (function () {
                    function ModuleInit() {
                    }
                    return ModuleInit;
                })();
                Person.ModuleInit = ModuleInit;
            })(ModularTypeScript.Person || (ModularTypeScript.Person = {}));
            var Person = ModularTypeScript.Person;
        })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
        var ModularTypeScript = NovaBurst.ModularTypeScript;
    })(NovaBurst || (NovaBurst = {}));

    Core;

    var Person = NovaBurst.ModularTypeScript.Person;
    

    var personModuleName = 'NovaBurst.ModularTypeScript.Person';

    // load external libraries
    require(['scripts/angular'], function () {
        // register Angular module
        angular.module(personModuleName, []);

        // load module scripts
        require([
            './models/Person',
            './models/PersonAddress',
            './models/PersonPhone',
            './models/PersonPhoneType'], function () {
        }, function () {
            // handle module load err
        });
    }, function () {
        // handle module load err
    });
    return Person;
});
//# sourceMappingURL=ModuleInit.js.map

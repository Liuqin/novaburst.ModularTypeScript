/// <reference path="models/Address.ts" />
/// <reference path="models/Phone.ts" />

module NovaBurst.ModularTypeScript.Core {
    export class ModuleInit {
    }
}

import Core = NovaBurst.ModularTypeScript.Core;
export = Core;

var coreModuleName = 'NovaBurst.ModularTypeScript.Core'

// load external libraries
require(['scripts/angular'],
    // success
    function () {

        // register Angular module
        angular.module(coreModuleName, []);

        // load module scripts
        require([
            './models/Address',
            './models/Phone'],
            // success
            function () {
            },
            // error
            function () {
                // handle module load err
            });
    },
    // error
    function () {
        // handle module load err
    });
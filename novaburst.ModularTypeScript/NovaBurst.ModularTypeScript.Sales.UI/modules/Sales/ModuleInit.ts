/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/ModuleInit.ts" />

/// <reference path="models/Customer.ts" />

module NovaBurst.ModularTypeScript.Sales {
    export class ModuleInit {
    }
}

import Core = require('../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit');
import Person = require('../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/ModuleInit');
Core;
Person;

import Sales = NovaBurst.ModularTypeScript.Sales;
export = Sales;

var salesModuleName = 'NovaBurst.ModularTypeScript.Sales';

// load external libraries
require(['scripts/angular'],
    // success
    function () {

        // register Angular module
        angular.module(salesModuleName, []);

        // load module scripts
        require(['./models/Customer'],
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
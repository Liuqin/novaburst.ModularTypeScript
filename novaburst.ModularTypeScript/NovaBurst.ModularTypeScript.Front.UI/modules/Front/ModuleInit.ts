/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/ModuleInit.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Sales.UI/modules/Sales/ModuleInit.ts" />

/// <reference path="controllers/FrontController.ts" />

module NovaBurst.ModularTypeScript.Front {
    export class ModuleInit {
    }
}


import Core = require('../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit');
import Person = require('../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/ModuleInit');
import Sales = require('../../../NovaBurst.ModularTypeScript.Sales.UI/modules/Sales/ModuleInit');
Core;
Person;
Sales;

import Front = NovaBurst.ModularTypeScript.Front;
export = Front;

var frontModuleName = 'NovaBurst.ModularTypeScript.Front';

// load external libraries
require(['scripts/angular'],
    // success
    function () {

        // register Angular module
        angular.module(frontModuleName, []);

        // load module scripts
        require(
            [
                './controllers/FrontController',
            ],
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
/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit.ts" />

/// <reference path="models/Person.ts" />
/// <reference path="models/PersonAddress.ts" />
/// <reference path="models/PersonPhone.ts" />
/// <reference path="models/PersonPhoneType.ts" />

module NovaBurst.ModularTypeScript.Person {
    export class ModuleInit {
    }
}

import Core = require('../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ModuleInit');
Core;

import Person = NovaBurst.ModularTypeScript.Person;
export = Person;

var personModuleName = 'NovaBurst.ModularTypeScript.Person';

// load external libraries
require(['scripts/angular'],
    // success
    function () {

        // register Angular module
        angular.module(personModuleName, []);

        // load module scripts
        require([
            './models/Person',
            './models/PersonAddress',
            './models/PersonPhone',
            './models/PersonPhoneType'],
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
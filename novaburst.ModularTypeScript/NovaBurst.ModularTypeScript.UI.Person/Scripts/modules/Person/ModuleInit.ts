/// <reference path="../../../../NovaBurst.ModularTypeScript.UI.Core/scripts/modules/Core/ModuleInit.ts" />

/// <reference path="models/Person.ts" />
/// <reference path="models/PersonAddress.ts" />
/// <reference path="models/PersonPhone.ts" />
/// <reference path="models/PersonPhoneType.ts" />

import Core = require('../../../../NovaBurst.ModularTypeScript.UI.Core/scripts/modules/Core/ModuleInit');
Core;

import Person = NovaBurst.ModularTypeScript.Person;
export = Person;

var personModuleName = 'NovaBurst.ModularTypeScript.Person';
angular.module(personModuleName, []); 
/// <reference path="../../../../NovaBurst.ModularTypeScript.UI.Core/scripts/modules/Core/ModuleInit.ts" />
/// <reference path="../../../../NovaBurst.ModularTypeScript.UI.Person/scripts/modules/Person/ModuleInit.ts" />

/// <referemce path="models/Customer.ts" />

import Core = require('../../../../NovaBurst.ModularTypeScript.UI.Core/scripts/modules/Core/ModuleInit');
import Person = require('../../../../NovaBurst.ModularTypeScript.UI.Person/Scripts/modules/Person/ModuleInit');
Core;
Person;

import Sales = NovaBurst.ModularTypeScript.Sales;
export = Sales;

var salesModuleName = 'NovaBurst.ModularTypeScript.Sales';
angular.module(salesModuleName, []);
/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/init.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/init.ts" />
/// <reference path="models/Customer.ts" />

import Core = require('../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/init');
import Person = require('../../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/init');
Core;
Person;

import Module = require('../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/utility/Module');
Module.ModuleLoader.loadModule('Sales', 'NovaBurst.ModularTypeScript.Sales');

import Sales = NovaBurst.ModularTypeScript.Sales;
export = Sales;
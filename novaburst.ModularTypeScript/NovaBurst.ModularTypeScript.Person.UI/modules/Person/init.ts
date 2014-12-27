/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/init.ts" />
/// <reference path="models/Person.ts" />
/// <reference path="models/PersonAddress.ts" />
/// <reference path="models/PersonPhone.ts" />
/// <reference path="models/PersonPhoneType.ts" />

import Core = require('../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/init');
Core;

import Module = require('../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/utility/Module');
Module.ModuleLoader.loadModule('Person', 'NovaBurst.ModularTypeScript.Person');

import Person = NovaBurst.ModularTypeScript.Person;
export = Person;
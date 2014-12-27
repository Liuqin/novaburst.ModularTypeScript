/// <reference path="models/Address.ts" />
/// <reference path="models/Phone.ts" />
/// <reference path="utility/Module.ts" />

import Module = require('./utility/Module');
Module.ModuleLoader.loadModule('Core', 'NovaBurst.ModularTypeScript.Core');

import Core = NovaBurst.ModularTypeScript.Core;
export = Core;
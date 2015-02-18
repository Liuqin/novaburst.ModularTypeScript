///<reference path="../../../scripts/typings/requirejs/require.d.ts" />
///<reference path="../../../scripts/typings/jquery/jquery.d.ts" />
define(["require", "exports", "scripts/jquery"], function (require, exports) {
    ///<amd-dependency path="scripts/jquery" />
    var Core = NovaBurst.ModularTypeScript.Core;
    // RequireJS plugin for loading modules and bundles
    function load(name, parentRequire, onload, config) {
        // create loader
        var loader = new Loader(Core.ModuleLoaderConfig.current);
        //// get scripts count
        //var countPromise = loader.getModuleScriptsCount(name);
        //countPromise.done(function (cnt) {
        //    console.log('>>> Count: ' + cnt);
        //})
        //    .fail(function () {
        //    console.log(">>> Count failed.");
        //});
        // load module
        var promise = loader.loadModule(name);
        // success
        promise.done(function () {
            onload(null);
        });
        // error
        promise.fail(function () {
            onload.error.apply(onload, arguments);
        });
    }
    exports.load = load;
    var Loader = (function () {
        function Loader(config) {
            this.config = config;
            /*
             * Scripts that could not be loaded.
             */
            this.errLoadingScripts = [];
        }
        /*
         * Load a specific module.
         */
        Loader.prototype.loadModule = function (modName) {
            var ctx = this;
            // process the module and load each script
            var processModulePromise = ctx.processModule(modName, function (script) {
                return ctx.loadModuleScript(script, Loader.processedModules);
            }, Loader.processedModules);
            return processModulePromise;
        };
        /*
         * Get total count of all module scripts.
         */
        Loader.prototype.getModuleScriptsCount = function (modName) {
            var ctx = this;
            var def = $.Deferred();
            var count = 0;
            var processedMap = {};
            // process the module and count each script
            var processModulePromise = ctx.processModule(modName, function (script) {
                count++;
                return $.when(null);
            }, processedMap);
            // success
            processModulePromise.done(function () {
                def.resolve(count);
            });
            // error
            processModulePromise.fail(function () {
                def.reject();
            });
            return def;
        };
        Loader.prototype.processModule = function (modName, processScriptFunc, processedMap) {
            var ctx = this;
            var def = $.Deferred();
            //var def: JQueryDeferred<any> = processedMap[modName.toLowerCase()];
            //if (def) {
            //    return def;
            //}
            //else {
            //    def = $.Deferred();
            //    processedMap[modName.toLowerCase()] = def;
            //}
            // try obtaining the bundle map
            var bundleMap = ctx.config.getModuleBundleMapInfo(modName);
            // if the bundle map was found then use its definition else search for a module with the given name
            if (bundleMap) {
                var loadBundlePromise = ctx.processModuleBundle(bundleMap, processScriptFunc, processedMap);
                // success
                loadBundlePromise.done(function () {
                    def.resolve();
                });
                // error
                loadBundlePromise.fail(function () {
                    def.reject();
                });
            }
            else {
                // search for module
                var modDef = ctx.config.getModuleDefinitionInfo(modName);
                // if bundling is enabled then load all bundles containing current module else load the module files individually
                if (modDef) {
                    var processModDefPromise = ctx.processModuleDefinition(modDef, processScriptFunc, processedMap);
                    // success
                    processModDefPromise.done(function () {
                        def.resolve();
                    });
                    // error
                    processModDefPromise.fail(function () {
                        def.reject();
                    });
                }
                else {
                    // process as a simple script otherwise
                    var processScriptPromise = ctx.processScripts([modName], processScriptFunc, processedMap);
                    // success
                    processScriptPromise.done(function () {
                        def.resolve();
                    });
                    // error
                    processScriptPromise.fail(function () {
                        def.reject();
                    });
                }
            }
            return def;
        };
        Loader.prototype.processModuleBundle = function (bundleMapInfo, processScriptFunc, processedMap) {
            var ctx = this;
            //var def = $.Deferred();
            var processedMapKey = 'bundle :: ' + bundleMapInfo.moduleBundleMap.relativeOutPath.toLowerCase();
            var def = processedMap[processedMapKey];
            if (def) {
                return def;
            }
            else {
                def = $.Deferred();
                processedMap[processedMapKey] = def;
            }
            // process bundle dependencies
            var bundleDepPromise = ctx.processModuleBundleDependencies(bundleMapInfo, processScriptFunc, processedMap);
            bundleDepPromise.done(function () {
                console.log('After dependencies for: ' + bundleMapInfo.moduleBundleMap.relativeOutPath);
                // if bundling is allowed then load the script
                if (ctx.config.useBundles) {
                    // load bundle script
                    var processScriptPromise = ctx.processScripts([bundleMapInfo.moduleBundleMap.relativeOutPath], processScriptFunc, processedMap);
                    // success
                    processScriptPromise.done(function () {
                        console.log('Done with: ' + bundleMapInfo.moduleBundleMap.relativeOutPath);
                        def.resolve();
                    });
                    // error
                    processScriptPromise.fail(function () {
                        def.reject();
                    });
                }
                else {
                    // load module bundle map files
                    var processScriptsPromise = ctx.processScripts(bundleMapInfo.moduleBundleMap.relativeFilePaths, processScriptFunc, processedMap);
                    // success
                    processScriptsPromise.done(function () {
                        def.resolve();
                    });
                    // error
                    processScriptsPromise.fail(function () {
                        def.reject();
                    });
                }
            });
            return def;
        };
        Loader.prototype.processModuleBundleDependencies = function (bundleMapInfo, processScriptFunc, processedMap) {
            var ctx = this;
            var def = $.Deferred();
            // bundle modules
            var modules = bundleMapInfo.moduleBundleMap.modules;
            if (!modules || modules.length == 0) {
                def.resolve();
                return def;
            }
            var processModulePromises = [];
            // a list of dependencies
            var dependencies = [];
            // create a list of module dependencies if are not set to be ignored
            if (!bundleMapInfo.moduleBundleMap.ignoreModuleDependencies) {
                modules.forEach(function (modName) {
                    // get module
                    var mod = ctx.config.getModuleDefinitionInfo(modName);
                    // add 
                    if (mod && mod.moduleDefinition.dependencies && mod.moduleDefinition.dependencies.length > 0) {
                        // load each dependency
                        mod.moduleDefinition.dependencies.forEach(function (depName) {
                            dependencies.push(depName);
                        });
                    }
                });
            }
            // add bundle custom dependencies
            if (bundleMapInfo.moduleBundleMap.dependencies && bundleMapInfo.moduleBundleMap.dependencies.length > 0) {
                dependencies.push.apply(dependencies, bundleMapInfo.moduleBundleMap.dependencies);
            }
            // process dependencies
            if (dependencies.length > 0) {
                dependencies.forEach(function (depName) {
                    // load dependency
                    var processModPromise = ctx.processModule(depName, processScriptFunc, processedMap);
                    processModulePromises.push(processModPromise);
                });
            }
            else {
                processModulePromises.push($.when(null));
            }
            $.when.apply($, processModulePromises).done(function () {
                def.resolve();
            }).fail(function () {
                def.reject();
            });
            return def;
        };
        Loader.prototype.processModuleDefinition = function (modDefInfo, processScriptFunc, processedMap) {
            var ctx = this;
            //var def = $.Deferred();
            var processedMapKey = 'module :: ' + modDefInfo.moduleDefinition.moduleName.toLowerCase();
            var def = processedMap[processedMapKey];
            if (def) {
                return def;
            }
            else {
                def = $.Deferred();
                processedMap[processedMapKey] = def;
            }
            // whether to process all module associated bundle maps or only the module scripts
            if (ctx.config.useBundles) {
                var processBundleMapPromises = [];
                // add all bundle maps scripts
                if (modDefInfo.moduleBundleMaps && modDefInfo.moduleBundleMaps.length > 0) {
                    modDefInfo.moduleBundleMaps.forEach(function (modBundleMap) {
                        // get module bundle map info
                        var modBundleMapInfo = ctx.config.getModuleBundleMapInfo(modBundleMap.relativeOutPath);
                        if (!modBundleMapInfo) {
                            console.warn('ModuleLoader :: No bundle map info found for ' + modBundleMap.relativeOutPath);
                        }
                        // process bundle map
                        var promise = ctx.processModuleBundle(modBundleMapInfo, processScriptFunc, processedMap);
                        processBundleMapPromises.push(promise);
                    });
                }
                else {
                    processBundleMapPromises.push($.when(null));
                }
                // process all bundle maps
                var processBundleMapPromisesAll = $.when.apply($, processBundleMapPromises);
                // success
                processBundleMapPromisesAll.done(function () {
                    def.resolve();
                });
                // error
                processBundleMapPromisesAll.fail(function () {
                    def.reject();
                });
            }
            else {
                var processDependenciesPromise = $.Deferred();
                // first process module dependencies
                if (modDefInfo.moduleDefinition.dependencies && modDefInfo.moduleDefinition.dependencies.length > 0) {
                    var processModulePromiseLst = [];
                    modDefInfo.moduleDefinition.dependencies.forEach(function (depModName) {
                        var processModulePromise = ctx.processModule(depModName, processScriptFunc, processedMap);
                        processModulePromiseLst.push(processModulePromise);
                    });
                    $.when.apply($, processModulePromiseLst).done(function () {
                        processDependenciesPromise.resolve();
                    }).fail(function () {
                        processDependenciesPromise.reject();
                    });
                }
                else {
                    processDependenciesPromise.resolve();
                }
                processDependenciesPromise.always(function () {
                    // process module scripts
                    var processScriptsPromise = ctx.processScripts(modDefInfo.moduleDefinition.scripts, processScriptFunc, processedMap);
                    // success
                    processScriptsPromise.done(function () {
                        def.resolve();
                    });
                    // error
                    processScriptsPromise.fail(function () {
                        def.reject();
                    });
                });
            }
            return def;
        };
        Loader.prototype.processScripts = function (scripts, processScriptFunc, processedMap) {
            var ctx = this;
            var def = $.Deferred();
            if (scripts && scripts.length > 0) {
                var promises = [];
                // load each script
                scripts.forEach(function (script) {
                    var processedMapKey = 'script :: ' + script.toLowerCase();
                    var processScriptPromise = processedMap[processedMapKey];
                    if (!processScriptPromise) {
                        processScriptPromise = processScriptFunc(script);
                        processedMap[processedMapKey] = processScriptPromise;
                    }
                    promises.push(processScriptPromise);
                });
                $.when.apply($, promises).done(function () {
                    def.resolve();
                }).fail(function () {
                    def.reject();
                });
            }
            else {
                def.resolve();
            }
            return def;
        };
        Loader.prototype.loadModuleScript = function (script, processedMap) {
            var ctx = this;
            var def = $.Deferred();
            require([script], 
            // success
            function () {
                console.log('Loaded: ' + script);
                def.resolve();
            }, 
            // error
            function () {
                console.warn('Err loading: ' + script);
                ctx.errLoadingScripts.push(script);
                def.reject();
            });
            return def;
        };
        // modules that have been processed
        Loader.processedModules = {};
        return Loader;
    })();
    exports.Loader = Loader;
});
//# sourceMappingURL=ModuleLoader.js.map
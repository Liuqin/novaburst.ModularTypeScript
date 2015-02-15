///<reference path="../../../scripts/typings/requirejs/require.d.ts" />
///<reference path="../../../scripts/typings/jquery/jquery.d.ts" />
define(["require", "exports", "scripts/jquery"], function (require, exports) {
    ///<amd-dependency path="scripts/jquery" />
    var Core = NovaBurst.ModularTypeScript.Core;
    // RequireJS plugin for loading modules and bundles
    function load(name, parentRequire, onload, config) {
        // create loader
        var loader = new Loader(Core.ModuleLoaderConfig.current);
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
        }
        /*
         * Load a specific module.
         */
        Loader.prototype.loadModule = function (modName) {
            var ctx = this;
            // process the module and load each script
            var processModulePromise = ctx.processModule(modName, function (script) {
                return ctx.loadModuleScript(script);
            });
            return processModulePromise;
        };
        /*
         * Get total count of all module scripts.
         */
        Loader.prototype.getModuleScriptsCount = function (modName) {
            var ctx = this;
            var def = $.Deferred();
            var count = 0;
            // process the module and count each script
            var processModulePromise = ctx.processModule(modName, function (scripts) {
                if (scripts && scripts.length > 0) {
                    count += scripts.length;
                }
                return $.when(null);
            });
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
        Loader.prototype.processModule = function (modName, processScriptFunc) {
            var ctx = this;
            var def = $.Deferred();
            // try obtaining the bundle map
            var bundleMap = ctx.config.getModuleBundleMapInfo(modName);
            // if the bundle map was found then use its definition else search for a module with the given name
            if (bundleMap) {
                var loadBundlePromise = ctx.processModuleBundle(bundleMap, processScriptFunc);
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
                    var processModDefPromise = ctx.processModuleDefinition(modDef, processScriptFunc);
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
                    var processScriptPromise = ctx.processScripts([modName], processScriptFunc);
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
        Loader.prototype.processModuleBundle = function (bundleMapInfo, processScriptFunc) {
            var ctx = this;
            var def = $.Deferred();
            // if bundling is allowed then load the script
            if (ctx.config.useBundles) {
                // load bundle script
                var processScriptPromise = ctx.processScripts([bundleMapInfo.moduleBundleMap.relativeOutPath], processScriptFunc);
                // success
                processScriptPromise.done(function () {
                    def.resolve();
                });
                // error
                processScriptPromise.fail(function () {
                    def.reject();
                });
            }
            else {
                // load module bundle map files
                var processScriptsPromise = ctx.processScripts(bundleMapInfo.moduleBundleMap.relativeFilePaths, processScriptFunc);
                // success
                processScriptsPromise.done(function () {
                    def.resolve();
                });
                // error
                processScriptsPromise.fail(function () {
                    def.reject();
                });
            }
            return def;
        };
        Loader.prototype.processModuleDefinition = function (modDefInfo, processScriptFunc) {
            var ctx = this;
            var def = $.Deferred();
            // whether to process all module associated bundle maps or only the module scripts
            if (ctx.config.useBundles) {
                var scripts = [];
                // add all bundle maps scripts
                if (modDefInfo.moduleBundleMaps && modDefInfo.moduleBundleMaps.length > 0) {
                    modDefInfo.moduleBundleMaps.forEach(function (modBundleMap) {
                        scripts.push(modBundleMap.relativeOutPath);
                    });
                }
                // process all bundle maps
                var processScriptsPromise = ctx.processScripts(scripts, processScriptFunc);
                // success
                processScriptsPromise.done(function () {
                    def.resolve();
                });
                // error
                processScriptsPromise.fail(function () {
                    def.reject();
                });
            }
            else {
                var processDependenciesPromise = $.Deferred();
                // first process module dependencies
                if (modDefInfo.moduleDefinition.dependencies && modDefInfo.moduleDefinition.dependencies.length > 0) {
                    var processModulePromiseLst = [];
                    modDefInfo.moduleDefinition.dependencies.forEach(function (depModName) {
                        var processModulePromise = ctx.processModule(depModName, processScriptFunc);
                        processModulePromiseLst.push(processModulePromise);
                    });
                    $.when(processModulePromiseLst).done(function () {
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
                    var processScriptsPromise = ctx.processScripts(modDefInfo.moduleDefinition.scripts, processScriptFunc);
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
        Loader.prototype.processScripts = function (scripts, processScriptFunc) {
            var ctx = this;
            var def = $.Deferred();
            if (scripts && scripts.length > 0) {
                var promises = [];
                // load each script
                scripts.forEach(function (script) {
                    var processScriptPromise = processScriptFunc(script);
                    promises.push(processScriptPromise);
                });
                $.when(scripts).done(function () {
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
        Loader.prototype.loadModuleScript = function (script) {
            var ctx = this;
            var def = $.Deferred();
            require([script], 
            // success
            function () {
                def.resolve();
            }, 
            // error
            function () {
                ctx.errLoadingScripts.push(script);
                def.reject();
            });
            return def;
        };
        return Loader;
    })();
    exports.Loader = Loader;
});
//# sourceMappingURL=ModuleLoader.js.map
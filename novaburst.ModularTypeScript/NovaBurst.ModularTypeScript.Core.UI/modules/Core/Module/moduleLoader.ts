///<reference path="../../../scripts/typings/requirejs/require.d.ts" />
///<reference path="../../../scripts/typings/jquery/jquery.d.ts" />

///<amd-dependency path="scripts/jquery" />

import Core = NovaBurst.ModularTypeScript.Core;


// RequireJS plugin for loading modules and bundles
export function load(name, parentRequire, onload, config): void {

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


export class Loader {

    // modules that have been processed
    public static processedModules: any = {};
    public static processedModulesOrder: string[];

    /*
     * Scripts that could not be loaded.
     */
    public errLoadingScripts: string[] = [];


    constructor(
        private config: Core.ModuleLoaderConfig) {
    }


    /*
     * Load a specific module.
     */
    public loadModule(modName: string): JQueryPromise<any> {
        var ctx = this;

        // process the module and load each script
        var processModulePromise = ctx.processModule(modName,(script) => {
            return ctx.loadModuleScript(script, Loader.processedModules);
        }, Loader.processedModules);

        return processModulePromise;
    }

    /*
     * Get total count of all module scripts.
     */
    public getModuleScriptsCount(modName: string): JQueryPromise<number> {
        var ctx = this;

        var def = $.Deferred();

        var count = 0;

        var processedMap = {};

        // process the module and count each script
        var processModulePromise = ctx.processModule(modName,(script) => {
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
    }


    private processModule(modName: string, processScriptFunc: (script: string) => JQueryPromise<any>, processedMap: any): JQueryPromise<any> {

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
    }

    private processModuleBundle(bundleMapInfo: Core.IModuleBundleMapInfo, processScriptFunc: (script: string) => JQueryPromise<any>, processedMap: any): JQueryPromise<any> {
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
    }

    private processModuleBundleDependencies(bundleMapInfo: Core.IModuleBundleMapInfo, processScriptFunc: (script: string) => JQueryPromise<any>, processedMap: any) {
        var ctx = this;

        var def = $.Deferred();

        // bundle modules
        var modules = bundleMapInfo.moduleBundleMap.modules;

        if (!modules || modules.length == 0) {
            def.resolve();
            return def;
        }

        var processModulePromises: JQueryPromise<any>[] = [];


        // a list of dependencies
        var dependencies = [];


        // create a list of module dependencies if are not set to be ignored
        if (!bundleMapInfo.moduleBundleMap.ignoreModuleDependencies) {
            modules.forEach(modName => {

                // get module
                var mod = ctx.config.getModuleDefinitionInfo(modName);

                // add 
                if (mod && mod.moduleDefinition.dependencies && mod.moduleDefinition.dependencies.length > 0) {

                    // load each dependency
                    mod.moduleDefinition.dependencies.forEach(depName => {

                        //console.log(bundleMapInfo.moduleBundleMap.relativeOutPath + ' --- ' + mod.moduleDefinition.moduleName + ' --- ' + depName);

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

            var depsNames = '';

            dependencies.forEach(depName => {

                depsNames += ', ' + depName;

                // load dependency
                var processModPromise = ctx.processModule(depName, processScriptFunc, processedMap);

                processModPromise.always(function () {
                    console.log('DEP LOADED >> ' + depName);
                });

                processModulePromises.push(processModPromise);
            });

            console.log('DEPS WAIT - ' + bundleMapInfo.moduleBundleMap.relativeOutPath + ' >>> ' + depsNames);
        }
        else {
            console.log('NO DEPS.');
            processModulePromises.push($.when(null));
        }


        $.when.apply($, processModulePromises)
            .done(function () {
            def.resolve();
        })
            .fail(function () {
            def.reject();
        });


        return def;
    }

    private processModuleDefinition(modDefInfo: Core.IModuleDefinitionInfo, processScriptFunc: (script: string) => JQueryPromise<any>, processedMap: any): JQueryPromise<any> {
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

            var processBundleMapPromises: JQueryPromise<any>[] = [];

            // add all bundle maps scripts
            if (modDefInfo.moduleBundleMaps && modDefInfo.moduleBundleMaps.length > 0) {
                modDefInfo.moduleBundleMaps.forEach(modBundleMap => {

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

                modDefInfo.moduleDefinition.dependencies.forEach(depModName => {
                    var processModulePromise = ctx.processModule(depModName, processScriptFunc, processedMap);
                    processModulePromiseLst.push(processModulePromise);
                });

                $.when.apply($, processModulePromiseLst)
                    .done(function () {
                    processDependenciesPromise.resolve();
                })
                    .fail(function () {
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
    }

    private processScripts(scripts: string[], processScriptFunc: (script: string) => JQueryPromise<any>, processedMap: any): JQueryPromise<any> {
        var ctx = this;

        var def = $.Deferred();

        if (scripts && scripts.length > 0) {

            var promises = [];

            // clone scripts
            var scriptsToProcess = scripts.slice(0);

            // process next script in sequence
            function processNextScript() {
                if (scriptsToProcess.length > 0) {

                    // remove and get first element from array
                    var script = scriptsToProcess.shift();

                    // determine if current script is already in process
                    var processedMapKey = 'script :: ' + script.toLowerCase();
                    var processScriptPromise: JQueryPromise<any> = processedMap[processedMapKey];

                    if (!processScriptPromise) {

                        processScriptPromise = processScriptFunc(script);
                        processedMap[processedMapKey] = processScriptPromise;
                    }

                    // wait for script to load before processing the next
                    processScriptPromise.always(function () {
                        processNextScript();
                    });
                }
                else {
                    def.resolve();
                }
            }

            // process next script
            processNextScript();
        }
        else {
            def.resolve();
        }

        return def;
    }

    private loadModuleScript(script: string, processedMap: any): JQueryPromise<any> {

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
    }
}

///<reference path="../../../scripts/typings/requirejs/require.d.ts" />
///<reference path="../../../scripts/typings/jquery/jquery.d.ts" />

///<amd-dependency path="scripts/jquery" />

import Core = NovaBurst.ModularTypeScript.Core;


// RequireJS plugin for loading modules and bundles
export function load(name, parentRequire, onload, config): void {

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


export class Loader {

    /*
     * Scripts that could not be loaded.
     */
    public errLoadingScripts: string[];


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
            return ctx.loadModuleScript(script);
        });

        return processModulePromise;
    }

    /*
     * Get total count of all module scripts.
     */
    public getModuleScriptsCount(modName: string): JQueryPromise<number> {
        var ctx = this;

        var def = $.Deferred();

        var count = 0;

        // process the module and count each script
        var processModulePromise = ctx.processModule(modName,(scripts) => {
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
    }


    private processModule(modName: string, processScriptFunc: (script: string) => JQueryPromise<any>): JQueryPromise<any> {
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
    }

    private processModuleBundle(bundleMapInfo: Core.IModuleBundleMapInfo, processScriptFunc: (script: string) => JQueryPromise<any>): JQueryPromise<any> {
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
    }

    private processModuleDefinition(modDefInfo: Core.IModuleDefinitionInfo, processScriptFunc: (script: string) => JQueryPromise<any>): JQueryPromise<any> {
        var ctx = this;

        var def = $.Deferred();

        // whether to process all module associated bundle maps or only the module scripts
        if (ctx.config.useBundles) {

            var scripts: string[] = [];

            // add all bundle maps scripts
            if (modDefInfo.moduleBundleMaps && modDefInfo.moduleBundleMaps.length > 0) {
                modDefInfo.moduleBundleMaps.forEach(modBundleMap => {
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

                modDefInfo.moduleDefinition.dependencies.forEach(depModName => {
                    var processModulePromise = ctx.processModule(depModName, processScriptFunc);
                    processModulePromiseLst.push(processModulePromise);
                });

                $.when(processModulePromiseLst)
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
    }

    private processScripts(scripts: string[], processScriptFunc: (script: string) => JQueryPromise<any>): JQueryPromise<any> {
        var ctx = this;

        var def = $.Deferred();

        if (scripts && scripts.length > 0) {

            var promises = [];

            // load each script
            scripts.forEach(script => {

                var processScriptPromise = processScriptFunc(script);
                promises.push(processScriptPromise);
            });

            $.when(scripts)
                .done(function () {
                def.resolve();
            })
                .fail(function () {
                def.reject();
            });
        }
        else {
            def.resolve();
        }

        return def;
    }

    private loadModuleScript(script: string): JQueryPromise<any> {
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
    }
}


















//// module bundle (contents)
//export class ModuleBundle {

//    // module script dependencies
//    public dependencies: string[];

//    // bundle scripts
//    public scripts: string[];
//}


//// require JS module loader
//export class Loader {

//    // load module
//    // moduleName = module name (eg: Core)
//    // ns = module namespace
//    // dependenciesLoadCallback = called when module external dependencies were loaded
//    // successCallback = called when loading completes successfully
//    // errorCallback = called when loading failed
//    public static loadModule(moduleName: string, ns: string, successCallback?: () => void, errorCallback?: () => void): void {

//        // ensure module namespace
//        var nsInstance = Loader.ensureNamespace(ns);

//        // load module dependencies
//        Loader.loadModuleFiles(moduleName, successCallback, errorCallback);
//    }

//    // ensure that a given namespace exists
//    public static ensureNamespace(ns: string): any {

//        // split namespace parts
//        var parts = ns.split('.');

//        // currently processed namespace part
//        var currentNs: any = window;

//        // for each namespace part ensure that the namespace exists
//        parts.forEach((part) => {
//            if (!currentNs[part]) {
//                currentNs[part] = {};
//            }

//            currentNs = currentNs[part];
//        });

//        return currentNs;
//    }

//    // load module
//    // dependenciesLoadCallback = called when module external dependencies were loaded
//    // successCallback = called when loading completes successfully
//    // errorCallback = called when loading failed
//    public static loadModuleFiles(moduleName: string, successCallback?: () => void, errorCallback?: () => void): void {

//        var userErrorCallback = errorCallback;

//        errorCallback = function () {
//            if (userErrorCallback) {
//                userErrorCallback();
//            }

//            console.log(arguments);
//        };

//        var path = 'modules/' + moduleName + '/';

//        // this operation is dependent on jQuery
//        require(['scripts/jquery'], function () {
//            Loader.loadModuleFilesFromBundle(path)
//                .done(function () {
//                    if (successCallback) {
//                        successCallback();
//                    }
//                })
//                .fail(function () {
//                    if (errorCallback) {
//                        errorCallback.apply(this, arguments);
//                    }
//                });
//        })
//    }

//    private static loadModuleFilesFromBundle(path: string): JQueryDeferred<any> {

//        var def = jQuery.Deferred();

//        // get bundle.json which describe current module contents
//        $.get(path + 'module.json')
//            .done(function (bundle: ModuleBundle) {

//                if (bundle && bundle.scripts && bundle.scripts.length > 0) {

//                    var dependencies = bundle.dependencies ? bundle.dependencies : [];

//                    var scriptDependencies: string[] = new Array();
//                    var bundleDependencies: string[] = new Array();

//                    // split dependencies between scripts and bundles
//                    dependencies.forEach(dep => {
//                        var match = /module.json$/gi.exec(dep);
//                        if (match)
//                            bundleDependencies.push(dep);
//                        else
//                            scriptDependencies.push(dep);
//                    });


//                    var scriptsDepDef = $.Deferred();

//                    // load all script dependencies
//                    if (scriptDependencies && scriptDependencies.length > 0) {
//                        require(scriptDependencies,
//                            function () {
//                                scriptsDepDef.resolve();
//                            },
//                            function () {
//                                scriptsDepDef.reject(arguments);
//                            });
//                    }
//                    else {
//                        scriptsDepDef.resolve();
//                    }


//                    var bundleDepDef = $.Deferred();

//                    // load bundle dependencies
//                    if (bundleDependencies && bundleDependencies.length > 0) {
//                        $.when.apply($, $.map(bundleDependencies, dep => {
//                            // extract path
//                            var path = dep.substr(0, dep.length - 'module.json'.length);

//                            // load bundle scripts
//                            return Loader.loadModuleFilesFromBundle(path);
//                        }))
//                            .done(function () {
//                                bundleDepDef.resolve();
//                            })
//                            .fail(function () {
//                                bundleDepDef.reject(arguments);
//                            });
//                    }
//                    else {
//                        bundleDepDef.resolve();
//                    }


//                    // when all dependencies are loaded load module scripts
//                    $.when(scriptsDepDef, bundleDepDef)
//                        .done(function () {
//                            if (window['isDebugMode']) {

//                                // debug mode => load all module files

//                                // scripts to load
//                                var scripts = $.map(bundle.scripts, (script) => path + script);

//                                // load scripts one after another in order
//                                Loader.loadScripts(scripts, 0, def);
//                            }
//                            else {
//                                // release mode => load bundle
//                                require([path + 'module.min'],
//                                    // success
//                                    function () {
//                                        def.resolve();
//                                    },
//                                    // error
//                                    function () {
//                                        def.reject(arguments);
//                                    });
//                            }
//                        })
//                        .fail(function () {
//                            def.reject(arguments);
//                        });
//                }
//            })
//            .fail(function () {
//                def.reject(arguments);
//            });


//        return def;
//    }

//    // load scripts one after another in order
//    private static loadScripts(scripts: string[], startIndex: number, def: JQueryDeferred<any>) {

//        if (!scripts || scripts.length == 0) {
//            def.resolve();
//            return;
//        }

//        require([ scripts[startIndex] ],
//            // success
//            function () {
//                if (startIndex < scripts.length - 1) {
//                    Loader.loadScripts(scripts, startIndex + 1, def);
//                }
//                else {
//                    def.resolve();
//                }
//            },
//            // error
//            function () {
//                def.reject(arguments);
//            });
//    }
//}



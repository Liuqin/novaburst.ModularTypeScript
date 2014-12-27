/// <reference path="../../scripts/typings/requirejs/require.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
define(["require", "exports"], function(require, exports) {
    // requireJS loader plugin - load() function for loading required resource
    function load(name, parentRequire, onload, config) {
        // load module dependencies
        Loader.loadModuleFiles(name, function () {
            onload(null);
        }, function () {
            onload.error.apply(onload, arguments);
        });
    }
    exports.load = load;

    // module bundle (contents)
    var ModuleBundle = (function () {
        function ModuleBundle() {
        }
        return ModuleBundle;
    })();
    exports.ModuleBundle = ModuleBundle;

    // require JS module loader
    var Loader = (function () {
        function Loader() {
        }
        // load module
        // moduleName = module name (eg: Core)
        // ns = module namespace
        // dependenciesLoadCallback = called when module external dependencies were loaded
        // successCallback = called when loading completes successfully
        // errorCallback = called when loading failed
        Loader.loadModule = function (moduleName, ns, successCallback, errorCallback) {
            // ensure module namespace
            var nsInstance = Loader.ensureNamespace(ns);

            // load module dependencies
            Loader.loadModuleFiles(moduleName, successCallback, errorCallback);
        };

        // ensure that a given namespace exists
        Loader.ensureNamespace = function (ns) {
            // split namespace parts
            var parts = ns.split('.');

            // currently processed namespace part
            var currentNs = window;

            // for each namespace part ensure that the namespace exists
            parts.forEach(function (part) {
                if (!currentNs[part]) {
                    currentNs[part] = {};
                }

                currentNs = currentNs[part];
            });

            return currentNs;
        };

        // load module
        // dependenciesLoadCallback = called when module external dependencies were loaded
        // successCallback = called when loading completes successfully
        // errorCallback = called when loading failed
        Loader.loadModuleFiles = function (moduleName, successCallback, errorCallback) {
            var userErrorCallback = errorCallback;

            errorCallback = function () {
                if (userErrorCallback) {
                    userErrorCallback();
                }

                console.log(arguments);
            };

            var path = 'modules/' + moduleName + '/';

            // this operation is dependent on jQuery
            require(['scripts/jquery'], function () {
                Loader.loadModuleFilesFromBundle(path).done(function () {
                    if (successCallback) {
                        successCallback();
                    }
                }).fail(function () {
                    if (errorCallback) {
                        errorCallback.apply(this, arguments);
                    }
                });
            });
        };

        Loader.loadModuleFilesFromBundle = function (path) {
            var def = jQuery.Deferred();

            // get bundle.json which describe current module contents
            $.get(path + 'module.json').done(function (bundle) {
                if (bundle && bundle.scripts && bundle.scripts.length > 0) {
                    var dependencies = bundle.dependencies ? bundle.dependencies : [];

                    var scriptDependencies = new Array();
                    var bundleDependencies = new Array();

                    // split dependencies between scripts and bundles
                    dependencies.forEach(function (dep) {
                        var match = /module.json$/gi.exec(dep);
                        if (match)
                            bundleDependencies.push(dep);
                        else
                            scriptDependencies.push(dep);
                    });

                    var scriptsDepDef = $.Deferred();

                    // load all script dependencies
                    if (scriptDependencies && scriptDependencies.length > 0) {
                        require(scriptDependencies, function () {
                            scriptsDepDef.resolve();
                        }, function () {
                            scriptsDepDef.reject(arguments);
                        });
                    } else {
                        scriptsDepDef.resolve();
                    }

                    var bundleDepDef = $.Deferred();

                    // load bundle dependencies
                    if (bundleDependencies && bundleDependencies.length > 0) {
                        $.when.apply($, $.map(bundleDependencies, function (dep) {
                            // extract path
                            var path = dep.substr(0, dep.length - 'module.json'.length);

                            // load bundle scripts
                            return Loader.loadModuleFilesFromBundle(path);
                        })).done(function () {
                            bundleDepDef.resolve();
                        }).fail(function () {
                            bundleDepDef.reject(arguments);
                        });
                    } else {
                        bundleDepDef.resolve();
                    }

                    // when all dependencies are loaded load module scripts
                    $.when(scriptsDepDef, bundleDepDef).done(function () {
                        if (window['isDebugMode']) {
                            // debug mode => load all module files
                            // scripts to load
                            var scripts = $.map(bundle.scripts, function (script) {
                                return path + script;
                            });

                            // load scripts one after another in order
                            Loader.loadScripts(scripts, 0, def);
                        } else {
                            // release mode => load bundle
                            require([path + 'module.min'], function () {
                                def.resolve();
                            }, function () {
                                def.reject(arguments);
                            });
                        }
                    }).fail(function () {
                        def.reject(arguments);
                    });
                }
            }).fail(function () {
                def.reject(arguments);
            });

            return def;
        };

        // load scripts one after another in order
        Loader.loadScripts = function (scripts, startIndex, def) {
            if (!scripts || scripts.length == 0) {
                def.resolve();
                return;
            }

            require([scripts[startIndex]], function () {
                if (startIndex < scripts.length - 1) {
                    Loader.loadScripts(scripts, startIndex + 1, def);
                } else {
                    def.resolve();
                }
            }, function () {
                def.reject(arguments);
            });
        };
        return Loader;
    })();
    exports.Loader = Loader;
});
//# sourceMappingURL=moduleLoader.js.map

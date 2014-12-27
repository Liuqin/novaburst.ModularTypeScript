define(["require", "exports"], function(require, exports) {
    // module bundle (contents)
    var ModuleBundle = (function () {
        function ModuleBundle() {
        }
        return ModuleBundle;
    })();
    exports.ModuleBundle = ModuleBundle;

    // module bundle script
    var ModuleBundleScript = (function () {
        function ModuleBundleScript() {
        }
        return ModuleBundleScript;
    })();
    exports.ModuleBundleScript = ModuleBundleScript;

    var ModuleLoader = (function () {
        function ModuleLoader() {
        }
        // load module
        // ns = module namespace
        // dependenciesLoadCallback = called when module external dependencies were loaded
        // successCallback = called when loading completes successfully
        // errorCallback = called when loading failed
        ModuleLoader.loadModule = function (ns, dependenciesLoadCallback, successCallback, errorCallback) {
            // ensure module namespace
            ModuleLoader.ensureNamespace(ns);

            // load module dependencies
            ModuleLoader.loadModuleFiles(dependenciesLoadCallback, successCallback, errorCallback);
        };

        // ensure that a given namespace exists
        ModuleLoader.ensureNamespace = function (ns) {
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
        };

        // load module
        // dependenciesLoadCallback = called when module external dependencies were loaded
        // successCallback = called when loading completes successfully
        // errorCallback = called when loading failed
        ModuleLoader.loadModuleFiles = function (dependenciesLoadCallback, successCallback, errorCallback) {
            // this operation is dependent on jQuery
            require(['scripts/jquery'], function () {
                // get bundle.json which describe current module contents
                $.get('bundle.json').done(function (bundleJson) {
                    // deserialize JSON
                    var bundle = JSON.parse(bundleJson);

                    if (bundle && bundle.scripts && bundle.scripts.length > 0) {
                        var dependencies = {};

                        // for each script create a map of dependencies to load prior to loading module files
                        bundle.scripts.forEach(function (bundleScript) {
                            if (!bundleScript.require || bundleScript.require.length <= 0) {
                                return;
                            }

                            // add dependencies
                            bundleScript.require.forEach(function (req) {
                                dependencies[req] = null;
                            });
                        });

                        // load all dependencies
                        require(Object.getOwnPropertyNames(dependencies), function () {
                            if (dependenciesLoadCallback) {
                                dependenciesLoadCallback();
                            }

                            // load all module files
                            require($.map(bundle.scripts, function (script) {
                                return script.name;
                            }), function () {
                                if (successCallback) {
                                    successCallback();
                                }
                            }, function () {
                                errorCallback.apply(this, arguments);
                            });
                        }, function () {
                            errorCallback.apply(this, arguments);
                        });
                    }
                }).fail(function () {
                    if (errorCallback) {
                        errorCallback.apply(this, arguments);
                    }
                });
            });
        };
        return ModuleLoader;
    })();
    exports.ModuleLoader = ModuleLoader;
});
//# sourceMappingURL=ModuleLoader.js.map

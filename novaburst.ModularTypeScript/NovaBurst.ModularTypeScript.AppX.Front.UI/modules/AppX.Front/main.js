/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/scripts/typings/requirejs/require.d.ts" />
// main entry point
var NovaBurst;
(function (NovaBurst) {
    var ModularTypeScript;
    (function (ModularTypeScript) {
        var AppX;
        (function (AppX) {
            var Front;
            (function (Front) {
                var Core = NovaBurst.ModularTypeScript.Core;
                // set debug or release mode - depending on debug query string param
                var isDebug = new RegExp('(\\?|(\\?.*&))debug(|&|=)').exec(document.URL) ? true : false;
                // RequireJS shim config
                var shimConfig = {
                    'scripts/bootstrap': ['scripts/jquery'],
                    'scripts/angular-route': ['scripts/angular']
                };
                // configure requireJS differently for debug and release modes
                if (isDebug) {
                    require.config({
                        shim: shimConfig,
                        paths: {
                            'scripts/jquery': 'scripts/jquery-2.1.1'
                        }
                    });
                }
                else {
                    require.config({
                        shim: shimConfig,
                        paths: {
                            'scripts/jquery': 'scripts/jquery-2.1.1.min',
                            'scripts/bootstrap': 'scripts/bootstrap.min',
                            'scripts/angular': 'scripts/angular.min',
                            'scripts/angular-route': 'scripts/angular-route.min'
                        }
                    });
                }
                // configure module loader
                var config = Core.ModuleLoaderConfig.current;
                config.useBundles = !isDebug;
                var loadPromise = config.loadFromJson('modules/bundles/modules.json', 'modules/bundles/bundles.json');
                loadPromise.fail(function () {
                    console.error('ModuleLoaderConfig :: Error loading config from JSON.');
                });
                // after configuration is complete load front module
                loadPromise.done(function () {
                    // load startup modules
                    require(['modules/Core/Module/ModuleLoader!modules/bundles/appx.front.min'], 
                    // success
                    function () {
                    }, 
                    // error
                    function () {
                        console.error('Error loading AppX.Front module');
                    });
                });
            })(Front = AppX.Front || (AppX.Front = {}));
        })(AppX = ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=main.js.map
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
                // set debug or release mode - depending on debug query string param
                window['isDebugMode'] = new RegExp('(\\?|(\\?.*&))debug(|&|=)').exec(document.URL) ? true : false;
                // RequireJS shim config
                var shimConfig = {
                    'scripts/bootstrap': ['scripts/jquery'],
                    'scripts/angular-route': ['scripts/angular']
                };
                // configure requireJS differently for debug and release modes
                if (window['isDebugMode']) {
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
                // load startup modules
                require(['modules/Core/Module/moduleLoader!AppX.Front'], 
                // success
                function () {
                }, 
                // error
                function () {
                });
            })(Front = AppX.Front || (AppX.Front = {}));
        })(AppX = ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
    })(ModularTypeScript = NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=main.js.map
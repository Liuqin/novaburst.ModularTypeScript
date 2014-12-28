/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/scripts/typings/requirejs/require.d.ts" />
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            // main entry point
            (function (Front) {
                // set debug or release mode
                window['isDebugMode'] = false;

                // configure requireJS differently for debug and release modes
                if (window['isDebugMode']) {
                    require.config({
                        paths: {
                            'scripts/jquery': 'scripts/jquery-2.1.1'
                        }
                    });
                } else {
                    require.config({
                        paths: {
                            'scripts/jquery': 'scripts/jquery-2.1.1.min',
                            'scripts/angular': 'scripts/angular.min'
                        }
                    });
                }

                // load startup modules
                require(['modules/Core/Module/moduleLoader!AppX.Front'], function () {
                }, function () {
                });
            })(AppX.Front || (AppX.Front = {}));
            var Front = AppX.Front;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=main.js.map

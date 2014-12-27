/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/scripts/typings/requirejs/require.d.ts" />
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
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
            require(['modules/Core/moduleLoader!Front'], function () {
            }, function () {
            });
        })(ModularTypeScript.Front || (ModularTypeScript.Front = {}));
        var Front = ModularTypeScript.Front;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
//# sourceMappingURL=main.js.map

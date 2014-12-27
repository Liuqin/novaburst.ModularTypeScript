/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/scripts/typings/requirejs/require.d.ts" />

// main entry point
module NovaBurst.ModularTypeScript.Front {

    // set debug or release mode
    window['isDebugMode'] = false;

    // configure requireJS differently for debug and release modes
    if (window['isDebugMode']) {

        require.config({
            paths:
            {
                'scripts/jquery': 'scripts/jquery-2.1.1'
            }
        });
    }
    else {

        require.config({
            paths:
            {
                'scripts/jquery': 'scripts/jquery-2.1.1.min',
                'scripts/angular': 'scripts/angular.min'
            }
        });
    }


    // load startup modules
    require(['modules/Core/moduleLoader!Front'],
        // success
        function () { },
        // error
        function () { });
}
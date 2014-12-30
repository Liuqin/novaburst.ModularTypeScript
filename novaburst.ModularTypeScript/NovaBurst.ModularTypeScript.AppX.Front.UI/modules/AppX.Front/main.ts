/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/scripts/typings/requirejs/require.d.ts" />

// main entry point
module NovaBurst.ModularTypeScript.AppX.Front {

    // set debug or release mode - depending on debug query string param
    window['isDebugMode'] = new RegExp('(\\?|(\\?.*&))debug(|&|=)').exec(document.URL) ? true : false;


    // RequireJS shim config
    var shimConfig: any =
        {
            'scripts/bootstrap': ['scripts/jquery'],
            'scripts/angular-route': ['scripts/angular'],
            'scripts/purl': ['scripts/jquery']
        };

    // configure requireJS differently for debug and release modes
    if (window['isDebugMode']) {

        require.config({
            shim: shimConfig,
            paths:
            {
                'scripts/jquery': 'scripts/jquery-2.1.1'
            }
        });
    }
    else {

        require.config({
            shim: shimConfig,
            paths:
            {
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
        function () { },
        // error
        function () { });
}
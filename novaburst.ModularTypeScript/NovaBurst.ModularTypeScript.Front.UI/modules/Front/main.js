// main entry point

// set debug or release mode
window['isDebugMode'] = false;

// configure requireJS differently for debug and release modes
if (window['isDebugMode']) {

    require.config(
        {
            shim:
                {
                    'scripts/angular': []
                },

            paths:
            {
                'modules/../../NovaBurst.ModularTypeScript.Core.UI': '.',
                'modules/../../NovaBurst.ModularTypeScript.Person.UI': '.',
                'modules/../../NovaBurst.ModularTypeScript.Sales.UI': '.',
                'modules/../../NovaBurst.ModularTypeScript.Front.UI': '.',

                'scripts/jquery': 'scripts/jquery-2.1.1'
            }
        });
}
else {

    require.config(
        {
            paths:
            {
                'modules/../../NovaBurst.ModularTypeScript.Core.UI': '.',
                'modules/../../NovaBurst.ModularTypeScript.Person.UI': '.',
                'modules/../../NovaBurst.ModularTypeScript.Sales.UI': '.',
                'modules/../../NovaBurst.ModularTypeScript.Front.UI': '.',

                'modules/../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/init': 'modules/Core/init.min',
                'modules/../../NovaBurst.ModularTypeScript.Person.UI/modules/Person/init': 'modules/Person/init.min',
                'modules/../../NovaBurst.ModularTypeScript.Sales.UI/modules/Sales/init': 'modules/Sales/init.min',
                'modules/Front/init': 'modules/Front/init.min',

                'scripts/jquery': 'scripts/jquery-2.1.1.min',
                'scripts/angular': 'scripts/angular.min'
            }
        });
}


// load startup modules
require(['modules/Front/init'],
    // success
    function () { },
    // error
    function () { });
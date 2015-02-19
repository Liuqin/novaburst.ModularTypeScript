
import moduleUtils = require('./modules/ModuleUtils/ModuleUtils');


// create bundling utility
var bundling = new moduleUtils.ModuleBundling(
    {
        basePath: __dirname + '/../',

        modulePathsJsonPath: __dirname + '/../NovaBurst.ModularTypeScript.AppX.Front.UI/modules/AppX.Front/module.paths.json',

        bundles:
        [
            // group all angular init scripts into a single file
            {
                files:
                [
                    { pattern: 'module.angular.js$' }
                ],
                out: 'NovaBurst.ModularTypeScript.Core.NodeJs\\out\\module.angular.min.js',
                dependencies: ['modules/_Libs/lib.angular/module.json'],
                ignoreModuleDependencies: true
            },

            // group scripts per module
            {
                files:
                [
                    { pattern: '(Core)\\\\module.json$', moduleFilesPattern: 'module.angular.js$', moduleFilesPatternReverse: true },
                    { pattern: '(AppX.Core)\\\\module.json$', moduleFilesPattern: 'module.angular.js$', moduleFilesPatternReverse: true },
                    { pattern: '(AppX.Sales)\\\\module.json$', moduleFilesPattern: 'module.angular.js$', moduleFilesPatternReverse: true },
                    { pattern: '(AppX.Front)\\\\module.json$', moduleFilesPattern: 'module.angular.js$', moduleFilesPatternReverse: true }
                ],
                out: 'NovaBurst.ModularTypeScript.Core.NodeJs\\out\\{{0}}.min.js',
                dependencies: ['modules/bundles/module.angular.min']
            },

            // group scripts per module
            {
                files:
                [
                    { pattern: '(lib[^\\\\]+)\\\\module.json$', moduleFilesPattern: 'module.angular.js$', moduleFilesPatternReverse: true }
                ],
                out: 'NovaBurst.ModularTypeScript.Core.NodeJs\\out\\{{0}}.min.js',
                dependencies: []
            }
        ]
    });


// write module definitions JSON
bundling.moduleDirectory.writeModuleDefinitionsJson('out\\modules.json');

// write bundling definitions JSON
bundling.writeBundleMapsJson('out\\bundles.json', false);


var config = bundling.createGruntUglifyFilesConfig(__dirname)

var a = 1;
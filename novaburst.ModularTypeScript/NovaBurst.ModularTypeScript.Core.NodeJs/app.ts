
import modBundling = require('./modules/ModuleUtils/ModuleUtils');

var bundling = new modBundling.ModuleBundling(
    {
        basePath: __dirname + '/../',

        bundles:
        [
            // group scripts per module
            {
                files:
                [
                    { pattern: '([^\\\\]+)\\\\module.json$', moduleFilesPattern: 'module.angular.js$', moduleFilesPatternReverse: true }
                ],
                out: 'module.min.json'
            },

            // group all angular init scripts into a single file
            {
                files:
                [
                    { pattern: 'module.angular.js$' }
                ],
                out: 'module.angular.min.js'
            }
        ]
    });



var path = require('path');

var map = bundling.writeBundleMapsJson(path.join(__dirname, 'bundle.json'), physicalFilePath => {

    var match = /\\(modules\\.+)\.js$/i.exec(physicalFilePath);

    if (match) {
        return match[1];
    }
    else {
        console.log('Could not create relative path for: \'' + physicalFilePath + '\'');
        return null;
    }
});
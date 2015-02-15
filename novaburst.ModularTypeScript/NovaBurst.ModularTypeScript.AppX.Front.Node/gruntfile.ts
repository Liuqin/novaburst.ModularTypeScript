///<reference path="Scripts/typings/gruntjs/gruntjs.d.ts" />

import moduleUtils = require('../novaburst.ModularTypeScript.Core.NodeJs/modules/ModuleUtils/ModuleUtils');

declare var __dirname: string;


export = gruntFunc;
var gruntFunc = (grunt: IGrunt) => {

    // create bundling utility
    var bundling = new moduleUtils.ModuleBundling(
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
                    out: 'NovaBurst.ModularTypeScript.AppX.Front.UI\\modules\\bundles\\{{0}}.min.js'
                },

                // group all angular init scripts into a single file
                {
                    files:
                    [
                        { pattern: 'module.angular.js$' }
                    ],
                    out: 'NovaBurst.ModularTypeScript.AppX.Front.UI\\modules\\bundles\\module.angular.min.js'
                }
            ]
        });


    // write module definitions JSON
    bundling.moduleDirectory.writeModuleDefinitionsJson('..\\NovaBurst.ModularTypeScript.AppX.Front.UI\\modules\\bundles\\modules.json');

    // write bundling definitions JSON
    bundling.writeBundleMapsJson('..\\NovaBurst.ModularTypeScript.AppX.Front.UI\\modules\\bundles\\bundles.json', false);


    // create Uglify config
    var uglifyConfig =
        {
            options:
            {
                sourceMap: false,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n'
            },
            build:
            {
                files: bundling.createGruntUglifyFilesConfig(__dirname)
            }
        };


    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),

            uglify: uglifyConfig
        });


    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);
} 

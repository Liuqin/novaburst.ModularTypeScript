module NovaBurst.ModularTypeScript.Core {

    export class ModuleLoaderConfig {

        /*
         * Singleton instance.
         */
        public static current: ModuleLoaderConfig = new ModuleLoaderConfig();

        /*
         * Whether to use bundles when solving modules or bundlings.
         */
        public useBundles: boolean = true;


        // module definitions
        private moduleDefinitions: IModuleDefinition[];    

        // module bundling maps
        private moduleBundleMaps: IModuleBundleMap[];

        // mapping between module name and module definition + bundle maps
        private moduleDefinitionsBundleMap: any = {};

        // mapping between bundling path and bundling definition
        private moduleBundleMapsMap: any = {};


        /*
         * Load module definitions and bundle maps from JSON.
         */
        public loadFromJson(modDefsPath: string, modBundlesPath: string): JQueryPromise<any> {
            var ctx = this;

            var def = $.Deferred();

            // get module definitions
            var getModDefsPromise = $.get(modDefsPath);
            
            // success
            getModDefsPromise.done(modDefinitions => {

                // set data
                ctx.moduleDefinitions = modDefinitions;

                // get module bundle maps
                var getModBundlesPromise = $.get(modBundlesPath);

                // suceess
                getModBundlesPromise.done(bundleMaps => {

                    // set data
                    ctx.moduleBundleMaps = bundleMaps;

                    // update map
                    ctx.createModuleDefinitionsBundlesMap();

                    def.resolve();
                });

                // error
                getModBundlesPromise.fail(function () {
                    def.reject();
                });
            });

            // error
            getModDefsPromise.fail(function () {
                def.reject();
            });

            return def;
        }

        /*
         * Get module definition info (module definition data and module bundle maps).
         */
        public getModuleDefinitionInfo(moduleName: string): IModuleDefinitionInfo {
            var ctx = this;

            // format name
            moduleName = moduleName.toLowerCase();

            // search map
            var mapData: IModuleDefinitionInfo = ctx.moduleDefinitionsBundleMap[moduleName];

            return mapData;
        }

        /*
         * Get module bundle map info (bundle map data).
         */
        public getModuleBundleMapInfo(moduleBundleMapPath: string): IModuleBundleMapInfo {
            var ctx = this;

            // format name
            moduleBundleMapPath = moduleBundleMapPath.toLowerCase();

            // search map
            var mapData: IModuleBundleMapInfo = ctx.moduleBundleMapsMap[moduleBundleMapPath];

            return mapData;
        }


        private createModuleDefinitionsBundlesMap() {
            var ctx = this;

            // init
            ctx.moduleDefinitionsBundleMap = {};
            ctx.moduleBundleMapsMap = {};

            // alias
            var modDefMap = ctx.moduleDefinitionsBundleMap;
            var modBundleMapMap = ctx.moduleBundleMapsMap;
            var modDefs = ctx.moduleDefinitions;
            var modBundleMaps = ctx.moduleBundleMaps;

            // add module definitions to map
            if (modDefs && modDefs.length > 0) {

                modDefs.forEach(modDef => {

                    var mapData: IModuleDefinitionInfo =
                        {
                            moduleDefinition: modDef,
                            moduleBundleMaps: []
                        };

                    modDefMap[modDef.moduleName.toLowerCase()] = mapData;
                });
            }

            // add bundle maps to map
            if (modBundleMaps && modBundleMaps.length) {

                modBundleMaps.forEach(modBundleMap => {

                    // create bundle map map data
                    var modBundleMapInfo: IModuleBundleMapInfo =
                        {
                            moduleBundleMap: modBundleMap
                        };

                    // update bundle maps map
                    modBundleMapMap[modBundleMap.relativeOutPath.toLowerCase()] = modBundleMapInfo;

                    if (modBundleMap.modules && modBundleMap.modules.length > 0) {
                        modBundleMap.modules.forEach(modName => {

                            // get data
                            var modDefInfo = ctx.getModuleDefinitionInfo(modName);

                            // update module definitions map data
                            modDefInfo.moduleBundleMaps.push(modBundleMap);
                        });
                    }
                });
            }
        }
    }


    export interface IModuleDefinitionInfo {

        moduleDefinition: IModuleDefinition;
        moduleBundleMaps: IModuleBundleMap[];
    }


    export interface IModuleDefinition {

        moduleName: string;
        dependencies: string[];
        scripts: string[];
    }


    export interface IModuleBundleMapInfo {
        moduleBundleMap: IModuleBundleMap;
    }


    export interface IModuleBundleMap {

        modules: string[];
        relativeFilePaths: string[];
        relativeOutPath: string;
        dependencies?: string[];
        ignoreModuleDependencies?: boolean;
    }
}
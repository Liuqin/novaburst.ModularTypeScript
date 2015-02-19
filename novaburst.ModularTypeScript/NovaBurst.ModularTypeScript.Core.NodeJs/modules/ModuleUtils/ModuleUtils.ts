import fs = require('fs');
import path = require('path');


export class ModuleBundling {

    // associated module directory
    public moduleDirectory: ModuleDirectory;

    // bundle maps (bundles and the associated files)
    private moduleBundleMaps: IModuleBundleMap[];

    // a map of bundle maps indexed by path.
    private moduleBundleMapsMapByPath: any;

    // a map of bundle maps indexed by bundle files.
    private moduleBundleMapsMapByFile: any;


    constructor(public options: IModuleBundlingOptions) {

        var ctx = this;

        // create module directory for managing modules
        ctx.moduleDirectory = new ModuleDirectory(options.basePath, options.modulePathsJsonPath);

        // get all bundle maps
        ctx.moduleBundleMaps = ctx.getBundleMaps();

        // create a map of bundle maps indexed by path
        //ctx.moduleBundleMapsMapByPath = ctx.createModuleBundleMapsMapByPath(ctx.moduleBundleMaps);

        // create a map of bundle maps indexed by bundle files.
        //ctx.moduleBundleMapsMapByFile = ctx.createModuleBundleMapsMapByFile(ctx.moduleBundleMaps);
    }


    /*
     * Create Grunt-Uglify config.
     * name: config bundle name
     * uglifyConfig: an existing Uglify config to extend.
     */
    public createGruntUglifyFilesConfig(relativeToPath: string): any {
        var ctx = this;

        var config = {};

        // get bundling spec
        var bundleMaps = ctx.getBundleMaps();

        if (bundleMaps && bundleMaps.length > 0) {

            bundleMaps.forEach((bundleMap, bundleMapIndex) => {

                if (bundleMap.files && bundleMap.files.length > 0) {

                    var bundleFiles = [];

                    bundleMap.files.forEach(file => {

                        // create relative path
                        var fileRelativePath = path.relative(relativeToPath, file.path).replace(/\\/g, '/');

                        bundleFiles.push(fileRelativePath);
                    });

                    // create out relative path
                    var outRelativePath = path.relative(relativeToPath, bundleMap.out).replace(/\\/g, '/');

                    // set bundle specs
                    config[outRelativePath] = bundleFiles;
                }
            });
        }

        return config;
    }

    public writeBundleMapsJson(destFilePath: string, includePhysicalPaths: boolean) {
        var ctx = this;

        // get bundle maps
        var maps = ctx.getBundleMapsExports(includePhysicalPaths);

        // stringify
        var mapsJson = JSON.stringify(maps, null, 4);

        // write file to path
        fs.writeFileSync(destFilePath, mapsJson);
    }

    public getBundleMapsExports(includePhysicalPaths: boolean): IModuleBundleMapExport[]{
        var ctx = this;

        var bundleMapsExports = [];

        // get bundle maps
        var bundleMaps = ctx.getBundleMaps();

        if (bundleMaps && bundleMaps.length > 0) {

            bundleMaps.forEach(bundleMap => {

                var physicalFilePaths: string[] = [];
                var relativeFilePaths: string[] = [];

                // create a list of modules referenced by current bundle
                var modulesMap = {};

                if (bundleMap.files && bundleMap.files.length > 0) {

                    bundleMap.files.forEach(bundleMapFile => {

                        // create a file path relative to the desired path
                        var relativeFilePath = bundleMapFile.pathRelative;

                        relativeFilePaths.push(relativeFilePath);
                        physicalFilePaths.push(bundleMapFile.path);

                        // keep track of modules used across files
                        modulesMap[bundleMapFile.parentModule.moduleName] = bundleMapFile.parentModule;
                    });
                }

                // create the list of modules referenced by current bundle
                var referencedModules = [];
                for (var prop in modulesMap) {
                    referencedModules.push(prop);
                }

                var bundleMapExport: IModuleBundleMapExport =
                    {
                        modules: referencedModules,
                        physicalFilePaths: includePhysicalPaths ? physicalFilePaths : undefined,
                        relativeFilePaths: relativeFilePaths,
                        physicalOutPath: includePhysicalPaths ? bundleMap.out : undefined,
                        relativeOutPath: bundleMap.outRelative,
                        dependencies: bundleMap.dependencies,
                        ignoreModuleDependencies: bundleMap.ignoreModuleDependencies
                    };

                bundleMapsExports.push(bundleMapExport);
            });
        }

        return bundleMapsExports;
    }

    /*
     * Get bundle map by path.
     */
    private getBundleMapByPath(path: string): IModuleBundleMap {
        var ctx = this;

        if (!path) {
            return null;
        }

        path = path.toLowerCase();

        var bundleMap = ctx.moduleBundleMapsMapByPath[path];
    }

    /*
     * Get bundle maps by bundle file path.
     */
    private getBundleMapsByFilePath(filePath: string): IModuleBundleMap[]{
        var ctx = this;

        if (!filePath) {
            return null;
        }

        filePath = filePath.toLowerCase();

        var bundles = ctx.moduleBundleMapsMapByFile[filePath];

        return bundles;
    }

    /*
     * Get all bundle maps. 
     */
    private getBundleMaps(): IModuleBundleMap[] {
        var ctx = this;

        var maps: IModuleBundleMap[] = [];

        // foreach bundle create bundle maps
        ctx.options.bundles.forEach(bundle => {

            // map bundle to physical files
            var bundleMaps = ctx.createBundleMaps(bundle);

            // add map to collection
            maps.push.apply(maps, bundleMaps);
        });

        return maps;
    }

    /*
     * Create bundle maps for bundle by searching the directory for files matching the requested pattern.
     */
    private createBundleMaps(bundle: IModuleBundle): IModuleBundleMap[] {
        var ctx = this;

        var maps: IModuleBundleMap[] = [];

        var groups = {};

        // foreach pattern get the files that match
        bundle.files.forEach(bundleFile => {

            // regex used to determine which files to include in the bundle
            var fileRegex = new RegExp(bundleFile.pattern);

            // foreach module scan its file to see if matches
            if (ctx.moduleDirectory.moduleDefinitions.length > 0) {
                ctx.moduleDirectory.moduleDefinitions.forEach(modDef => {

                    // if the pattern matches the module definition file module.json then create the bundle map files based on module contents
                    var moduleJsonMatch = fileRegex.exec(modDef.filePath);

                    if ((moduleJsonMatch && !bundleFile.patternReverse) || (!moduleJsonMatch && bundleFile.patternReverse)) {

                        // add entire module
                        ctx.addBundleMapFilesToGroup(groups, moduleJsonMatch, modDef.filePath, modDef.filePath, modDef, bundleFile);
                    }
                    else {
                        // analyze each of the module scripts to see if there is a match
                        if (modDef.scripts && modDef.scripts.length > 0) {

                            modDef.scripts.forEach(scriptPath => {

                                // create absolute script path
                                var absScriptPath = path.join(modDef.fileDir, scriptPath) + '.js';

                                var match = fileRegex.exec(absScriptPath);

                                if (match) {

                                    // add current match file
                                    ctx.addBundleMapFilesToGroup(groups, match, absScriptPath, scriptPath, modDef, bundleFile);
                                }
                            });
                        }
                    }
                });
            }
        });


        for (var groupName in groups) {

            // get group by name
            var group = groups[groupName];

            // format output path
            var formattedOutPath = ctx.formatStringUsingGroupNames(bundle.out, group.patternGroups);

            // create physical path (if does not exist then is relative and will be combined with the basePath passed into options)
            if (fs.existsSync(formattedOutPath) == false) {
                formattedOutPath = path.normalize(path.join(ctx.options.basePath, formattedOutPath));
            }

            // order bundle map files by bundle order and the order that file has within the bundle
            var orderedBundleMapFiles = ctx.orderBundleMapFiles(group.files);

            // create dependencies and format each dependency using the group name
            var dependencies = undefined;
            if (bundle.dependencies && bundle.dependencies.length > 0) {
                dependencies = [];
                bundle.dependencies.forEach(dep => {
                    var formattedDep = ctx.formatStringUsingGroupNames(dep, group.patternGroups);
                    dependencies.push(formattedDep);
                });
            }

            // create bundle map
            var map: IModuleBundleMap =
                {
                    bundle: bundle,
                    groupName: groupName,
                    patternGroups: group.patternGroups,
                    files: orderedBundleMapFiles,
                    out: formattedOutPath,
                    outRelative: ModuleDirectory.getModuleFileRelativePath(formattedOutPath),
                    dependencies: dependencies,
                    ignoreModuleDependencies: bundle.ignoreModuleDependencies
                };

            // add map to collection
            maps.push(map);
        }

        return maps;
    }

    /*
     * Create a map of bundles indexed by path.
     */
    private createModuleBundleMapsMapByPath(modBundleMaps: IModuleBundleMap[]): any {
        var ctx = this;

        var map = {};

        if (!modBundleMaps || modBundleMaps.length == 0) {
            return map;
        }

        modBundleMaps.forEach(modBundleMap => {

            map[modBundleMap.outRelative.toLowerCase()] = modBundleMap;
        });

        return map;
    }

    /*
     * Create a map of bundles indexed by each of the bundle file.
     */
    private createModuleBundleMapsMapByFile(modBundleMaps: IModuleBundleMap[]): any {
        var ctx = this;

        var map = {};

        if (!modBundleMaps || modBundleMaps.length == 0) {
            return map;
        }

        modBundleMaps.forEach(modBundleMap => {

            if (modBundleMap.files && modBundleMap.files.length > 0) {

                modBundleMap.files.forEach(file => {

                    var key = file.pathRelative.toLowerCase();
                    var bundles: IModuleBundleMap[] = map[key];

                    if (!bundles) {
                        bundles = [];
                        map[key] = bundles;
                    }

                    bundles.push(modBundleMap);
                });
            }
        });

        return map;
    }

    /*
     * Order bundle map files by bundle order and the order that file has within the bundle.
     */
    private orderBundleMapFiles(bundleMapFiles: IModuleBundleMapFile[]): IModuleBundleMapFile[] {
        var ctx = this;

        var map = {};

        bundleMapFiles.forEach(bundleMapFile => {
            var fileOrder = ctx.moduleDirectory.getModuleDefinitionFileOrder(bundleMapFile.pathRelative);
            if (fileOrder) {
                map[fileOrder] = bundleMapFile;
            }
        });

        var orderedBundleMapFiles = [];

        for (var prop in map) {
            var bundleMapFile = map[prop];
            orderedBundleMapFiles.push(bundleMapFile);
        }

        return orderedBundleMapFiles;
    }

    private formatStringUsingGroupNames(input: string, patternGroups: string[]): string {
        var ctx = this;

        if (!input || !patternGroups || patternGroups.length == 0) {
            return input;
        }

        patternGroups.forEach((patternGroup, index) => {
            input = input.replace('{{' + index + '}}', patternGroup);
        });

        return input;
    }

    private addBundleMapFilesToGroup(groups: any, match: RegExpExecArray, absScriptPath: string, scriptPath: string, modDef: IModuleDefinition, bundleFile: IModuleBundleFile) {
        var ctx = this;

        var groupName = '_';
        var patternGroups = [];

        // join all groups to form a key used for grouping
        if (match.length > 1) {
            patternGroups = match.slice(1);
            groupName = patternGroups.join('_');
        }

        var group = groups[groupName];

        // create group if does not exist
        if (!group) {

            group =
            {
                groupName: groupName,
                patternGroups: patternGroups,
                files: []
            };

            groups[groupName] = group;
        }

        // create bundle map files
        var bundleMapFiles = ctx.createBundleMapFiles(absScriptPath, scriptPath, modDef, bundleFile);

        group.files.push.apply(group.files, bundleMapFiles);
    }

    /*
     * Create bundle map file.
     */
    private createBundleMapFiles(filePath: string, originalFilePath: string, modDef: IModuleDefinition, bundleFile: IModuleBundleFile): IModuleBundleMapFile[] {
        var ctx = this;

        var bundleMapFiles: IModuleBundleMapFile[] = [];

        // determine if the file exists
        if (fs.existsSync(filePath)) {

            // determine if the file is module.json and if it is then add all files
            if (/module.json$/i.exec(filePath)) {

                // add each of the included script
                if (modDef.scripts && modDef.scripts.length > 0) {
                    modDef.scripts.forEach(scriptPath => {

                        // create script absolute path
                        var scriptPathAbs = path.join(modDef.fileDir, scriptPath) + '.js';

                        // create regex for validating script path
                        var scriptPathRegex = bundleFile.moduleFilesPattern ? new RegExp(bundleFile.moduleFilesPattern, "i") : null;

                        // check if the script path is allowed
                        if (scriptPathRegex
                            && ((!scriptPathRegex.exec(scriptPathAbs) && !bundleFile.moduleFilesPatternReverse)
                            || (scriptPathRegex.exec(scriptPathAbs) && bundleFile.moduleFilesPatternReverse))) {

                            return;
                        }

                        // create bundle map file for script path
                        var scriptBundleMapFiles = ctx.createBundleMapFiles(scriptPathAbs, scriptPath, modDef, bundleFile);

                        bundleMapFiles.push.apply(bundleMapFiles, scriptBundleMapFiles);
                    });
                }
            }
            else {

                // create searchable script path
                var scriptPath = path.resolve(filePath).toLowerCase();

                bundleMapFiles.push(
                    {
                        parentModule: modDef,
                        bundleFile: bundleFile,
                        path: filePath,
                        pathRelative: ModuleDirectory.getModuleFileRelativePath(filePath),
                        originalPath: originalFilePath,
                        isLocal: true
                    });
            }
        }
        else {
            // create bundle map file
            bundleMapFiles.push(
                {
                    parentModule: modDef,
                    bundleFile: bundleFile,
                    path: filePath,
                    pathRelative: ModuleDirectory.getModuleFileRelativePath(filePath),
                    originalPath: originalFilePath,
                    isLocal: false
                });
        }

        return bundleMapFiles;
    }
}


export class ModuleDirectory {

    public static moduleJsonPathRegex = new RegExp("modules\\\\.*([^\\\\]+)\\\\module\\.json$", "i");
    public static moduleFilePathRegex = new RegExp("((modules|scripts)\\\\.+)\\.js$", "i");

    public moduleDefinitions: IModuleDefinition[];

    private moduleDefinitionsMapOfNames: any = {};

    private moduleDefinitionsFilesOrder: any = {};

    private moduleDefintionsLeaves: IModuleDefinition[];

    private modulePaths: IModulePaths;


    constructor(
        public basePath: string,
        public modulePathsJsonPath: string) {

        var ctx = this;

        // get module paths JSON
        ctx.modulePaths = ctx.getModulePaths(modulePathsJsonPath);

        // get all module definitions
        ctx.moduleDefinitions = ctx.getModulesDefinitions();

        // create map of names
        ctx.createModuleDefinitionsMapOfNames();

        // assign module definitions dependencies
        ctx.assignModuleDependencies();

        // determine modules leaves
        //ctx.determineModuleLeaves();

        // foreach module definition set the associated order as seen in the module definition tree (formed by dependencies)
        ctx.setModuleTreeOrder();

        // create order of all module files
        ctx.createModuleDefinitionsFilesOrderMap();
    }


    /*
     * Writes module definitions to json
     */
    public writeModuleDefinitionsJson(destFilePath: string) {
        var ctx = this;

        // get module definitions exports
        var modDefExports = ctx.getModuleDefinitionsExports();

        // stringify
        var mapsJson = JSON.stringify(modDefExports, null, 4);

        // write file to path
        fs.writeFileSync(destFilePath, mapsJson);
    }

    /*
     * Create modules definitions exports.
     */
    public getModuleDefinitionsExports(): IModuleDefinitionExport[]{
        var ctx = this;

        var modDefExportLst = [];

        if (ctx.moduleDefinitions && ctx.moduleDefinitions.length > 0) {
            ctx.moduleDefinitions.forEach(modDef => {

                // create the list of scripts
                var appRelativeScripts: string[] = [];

                var modAppPath = path.dirname(modDef.moduleName);

                if (modDef.scripts && modDef.scripts.length > 0) {
                    modDef.scripts.forEach(script => {
                        appRelativeScripts.push(path.join(modAppPath, script));
                    });
                }

                // create export
                var modDefExport: IModuleDefinitionExport =
                    {
                        moduleName: modDef.moduleName,
                        dependencies: modDef.dependencies,
                        scripts: appRelativeScripts
                    };

                modDefExportLst.push(modDefExport);
            });
        }

        return modDefExportLst;
    }

    /*
     * Get module definition by module name.
     */
    public getModuleDefinitionByModuleName(moduleName: string): IModuleDefinition {
        var ctx = this;

        var modName = moduleName.toLowerCase().replace(/\\/g, '/');
        var modDef = ctx.moduleDefinitionsMapOfNames[modName];

        return modDef;
    }

    /*
     * Get the order of a specific file.
     */
    public getModuleDefinitionFileOrder(filePath: string): number {
        var ctx = this;

        var key = filePath.toLowerCase();

        var fileOrder = ctx.moduleDefinitionsFilesOrder[key];

        return fileOrder;
    }

    /*
     * Parse module tree from bottom to top.
     */
    public parseModuleTree(moduleDef: IModuleDefinition, moduleFunc: (moduleDef: IModuleDefinition) => void, fromModDef?: IModuleDefinition, parseMap?: any) {
        var ctx = this;

        if (!parseMap) {
            parseMap = {};
        }

        // determine cycles
        var parseKey = (fromModDef ? fromModDef.moduleName.toLowerCase() : '...') + ' - ' + moduleDef.moduleName.toLowerCase();
        var parseKeyInverse = moduleDef.moduleName.toLowerCase() + ' - ' + (fromModDef ? fromModDef.moduleName.toLowerCase() : '...');

        if (parseMap[parseKeyInverse]) {
            throw ('Cycle found for path \'' + parseKey + '\' while parsing the modules tree.');
        }

        parseMap[parseKey] = true;


        // parse dependencies
        if (moduleDef.dependencies && moduleDef.dependencies.length > 0) {
            moduleDef.dependencies.forEach(dep => {

                // get dependency module
                var depModDef = ctx.getModuleDefinitionByModuleName(dep);

                if (depModDef) {
                    ctx.parseModuleTree(depModDef, moduleFunc, moduleDef, parseMap);
                }
            });
        }

        // current module
        moduleFunc(moduleDef);
    }


    public static getModuleFileRelativePath(filePath: string): string {
        var ctx = this;

        var match = ModuleDirectory.moduleFilePathRegex.exec(filePath);

        if (match) {
            return match[1].replace(/\\/g, '/').toLowerCase();
        }
        else {
            return null;
        }
    }

    // get directory files
    public static getDirectoryFiles(dir: string, regex?: RegExp): string[] {
        var ctx = this;

        var files = [];

        // get directory files
        var dirFileNames = fs.readdirSync(dir);

        if (dirFileNames && dirFileNames.length > 0) {
            dirFileNames.forEach((fileName) => {

                // create file path
                var file = path.normalize(path.join(dir, fileName));

                // get file stat
                var stat = fs.statSync(file);

                // if is directory then recursively add files else add the file to the list
                if (stat.isDirectory()) {
                    var dirFilesRec = ctx.getDirectoryFiles(file, regex);

                    if (dirFilesRec && dirFilesRec.length) {
                        files.push.apply(files, dirFilesRec);
                    }
                }
                else {
                    if (regex) {
                        if (regex.exec(file)) {
                            console.log(file);
                            files.push(file);
                        }
                    }
                    else {
                        files.push(file);
                    }
                }
            });
        }

        return files;
    }

    // get module definition
    public static getModuleDefinition(moduleJsonPath: string): IModuleDefinition {
        var ctx = this;

        // get module name
        var moduleName: string = null;

        var moduleNameMatch = ModuleDirectory.moduleJsonPathRegex.exec(moduleJsonPath);

        if (moduleNameMatch) {

            moduleName = moduleNameMatch[0].replace(/\\/g, '/');
        }
        else {
            console.log('WARNING! Module name could not be determined for path: ' + moduleJsonPath);
        }

        // read module.json contents
        var moduleJson = fs.readFileSync(moduleJsonPath, { encoding: 'utf8' }).toString();

        var mod: IModuleDefinition = null;

        // deserialize JSON
        eval('mod = ' + moduleJson);

        // set module name
        mod.moduleName = moduleName;
        // set module file path
        mod.filePath = moduleJsonPath;
        // set module file directory
        mod.fileDir = path.dirname(moduleJsonPath);

        return mod;
    }

    /*
     * Resolve a given script path considering the given module definition physical paths and the main module paths.
     */
    private resolveScriptPath(scriptPath: string, modDef: IModuleDefinition): string {
        var ctx = this;

        scriptPath = scriptPath.toLowerCase();

        // change path according to the main module paths
        if (ctx.modulePaths && ctx.modulePaths.paths) {

            for (var subpath in ctx.modulePaths.paths) {

                if (scriptPath.indexOf((<string>subpath).toLowerCase()) == 0) {

                    scriptPath = scriptPath.slice(subpath.length);
                    scriptPath = ctx.modulePaths.paths[subpath] + scriptPath;
                    scriptPath = scriptPath.toLowerCase();
                    break;
                }
            }
        }

        // use module definition to create physical path
        if (modDef.physicalPaths) {

            for (var subpath in modDef.physicalPaths) {

                if (scriptPath.indexOf((<string>subpath).toLowerCase()) == 0) {

                    scriptPath = scriptPath.slice(subpath.length);
                    scriptPath = modDef.physicalPaths[subpath] + scriptPath;
                    scriptPath = scriptPath.toLowerCase();
                    break;
                }
            }
        }

        return scriptPath;
    }


    private getModulePaths(modulePathsJsonPath: string): IModulePaths {
        var ctx = this;

        if (!modulePathsJsonPath) {
            return null;
        }

        if (fs.existsSync(modulePathsJsonPath) == false) {
            throw 'Module paths JSON does not exist on path: ' + modulePathsJsonPath;
        }

        var jsonStr: string = fs.readFileSync(modulePathsJsonPath, 'utf8');

        var modPaths: IModulePaths;

        eval('modPaths = ' + jsonStr);

        return modPaths;
    }

    /*
     * Set order of each module definition.
     */
    private setModuleTreeOrder() {
        var ctx = this;

        if (!ctx.moduleDefinitions || ctx.moduleDefinitions.length == 0) {
            return;
        }

        var currentOrder = 1;


        // get root modules
        var rootModules = ctx.getRootModules();

        if (!rootModules || rootModules.length == 0) {
            throw 'No root modules. Check module dependencies and ensure that no cycles are found.';
        }


        // foreach module definition set the associated order
        rootModules.forEach(modDef => {

            if (modDef.order) {
                return;
            }

            ctx.parseModuleTree(modDef,(currentModDef) => {

                if (currentModDef.order)
                    return;

                currentModDef.order = currentOrder;
                currentOrder++;
            });
        });


        // display order of modules
        var map = {};
        ctx.moduleDefinitions.forEach(modDef => {
            map[modDef.order] = modDef;
        });

        console.log('\nModules order:');
        for (var order in map) {
            var modDef: IModuleDefinition = map[order];
            console.log(order + '. ' + modDef.moduleName);
        }
    }

    private createModuleDefinitionsMapOfNames() {
        var ctx = this;

        ctx.moduleDefinitionsMapOfNames = {};

        ctx.moduleDefinitions.forEach(modDef => {
            ctx.moduleDefinitionsMapOfNames[modDef.moduleName.toLowerCase().replace(/\\/g, '/')] = modDef;
        });
    }

    private assignModuleDependencies() {
        var ctx = this;

        if (!ctx.moduleDefinitions || ctx.moduleDefinitions.length == 0) {
            return;
        }

        ctx.moduleDefinitions.forEach(modDef => {

            modDef.dependenciesModules = [];

            if (modDef.dependencies && modDef.dependencies.length > 0) {
                modDef.dependencies.forEach(depModDefName => {
                    var depModDef = ctx.getModuleDefinitionByModuleName(depModDefName);

                    if (depModDef) {
                        modDef.dependenciesModules.push(depModDef);

                        if (!depModDef.parentModules)
                            depModDef.parentModules = [];

                        depModDef.parentModules.push(modDef);
                    }
                });
            }
        });
    }

    private createModuleDefinitionsFilesOrderMap() {
        var ctx = this;

        if (!ctx.moduleDefinitions || ctx.moduleDefinitions.length == 0) {
            return;
        }

        var modDefLst = {};

        // order modules by order field
        ctx.moduleDefinitions.forEach(modDef => {
            modDefLst[modDef.order] = modDef;
        });


        // add each of the modules files order
        var fileOrder = 1;

        for (var prop in modDefLst) {
            var modDef: IModuleDefinition = modDefLst[prop];

            if (modDef.scripts && modDef.scripts.length > 0) {
                modDef.scripts.forEach(scriptPath => {

                    var scriptAbsPath = path.join(modDef.fileDir, scriptPath + '.js');
                    var scriptRelativePath = ModuleDirectory.getModuleFileRelativePath(scriptAbsPath);

                    if (scriptAbsPath) {
                        ctx.moduleDefinitionsFilesOrder[scriptRelativePath] = fileOrder;
                        fileOrder++;
                    }
                });
            }
        }


        // display order of files
        console.log('\nModules files order:');
        var filePathIndex = 1;
        for (var filePath in ctx.moduleDefinitionsFilesOrder) {
            console.log(filePathIndex + '. ' + filePath);
            filePathIndex++;
        }
    }

    private getLevesModules() {
        var ctx = this;

        // select leaves
        var leavesModules = [];
        ctx.moduleDefinitions.forEach(modDef => {

            // leaf has no dependency on other modules
            if (!modDef.dependencies || modDef.dependencies.length == 0 || !modDef.dependenciesModules || modDef.dependenciesModules.length == 0) {
                leavesModules.push(modDef);
                return;
            }
        });

        return leavesModules;
    }

    private getRootModules(): IModuleDefinition[] {
        var ctx = this;

        var roots: IModuleDefinition[] = [];

        if (!ctx.moduleDefinitions || ctx.moduleDefinitions.length == 0) {
            return roots;
        }

        // map of all dependencies
        var dependencies: any = {};

        // create the map of all dependencies
        ctx.moduleDefinitions.forEach(modDef => {

            if (modDef.dependencies && modDef.dependencies.length > 0) {
                modDef.dependencies.forEach(dep => {
                    dependencies[dep.toLowerCase()] = true;
                });
            }
        });

        // determine root modules
        ctx.moduleDefinitions.forEach(modDef => {

            if (!dependencies[modDef.moduleName.toLowerCase()]) {
                roots.push(modDef);
            }
        });

        return roots;
    }

    // get modules
    private getModulesDefinitions(): IModuleDefinition[] {
        var ctx = this;

        var moduleDefLst: IModuleDefinition[] = [];

        // get all module.json files
        var files = ModuleDirectory.getDirectoryFiles(ctx.basePath, ModuleDirectory.moduleJsonPathRegex);

        // foreach file get its module
        files.forEach(file => {

            // get definition from file
            var moduleDef = ModuleDirectory.getModuleDefinition(file);

            var resolvedScriptPaths = [];

            // resolve script paths
            if (moduleDef.scripts && moduleDef.scripts.length > 0) {
                moduleDef.scripts.forEach(script => {
                    var resolvedScriptPath = ctx.resolveScriptPath(script, moduleDef);
                    resolvedScriptPaths.push(resolvedScriptPath);
                });
            }

            moduleDef.scripts = resolvedScriptPaths;

            moduleDefLst.push(moduleDef);
        });

        return moduleDefLst;
    }
}


export interface IModuleBundleMapExport {

    modules: string[];
    physicalFilePaths: string[];
    relativeFilePaths: string[];
    physicalOutPath: string;
    relativeOutPath: string;
    dependencies?: string[];
    ignoreModuleDependencies?: boolean;
}


export interface IModuleBundleMap {

    bundle: IModuleBundle;
    groupName: string;
    patternGroups: string[];
    files: IModuleBundleMapFile[];
    out: string;
    outRelative: string;
    dependencies?: string[];
    ignoreModuleDependencies?: boolean;
}


export interface IModuleBundleMapFile {

    parentModule: IModuleDefinition;
    bundleFile: IModuleBundleFile;
    path: string;
    pathRelative: string;
    originalPath: string;
    isLocal: boolean;
    order?: number;
}


export interface IModuleBundlingOptions {

    basePath: string;
    modulePathsJsonPath: string;
    bundles: IModuleBundle[];
}


export interface IModuleBundle {

    files: IModuleBundleFile[];
    out: string;
    dependencies?: string[];
    ignoreModuleDependencies?: boolean;
}


export interface IModuleBundleFile {

    pattern: string;
    patternReverse?: boolean;
    moduleFilesPattern?: string;
    moduleFilesPatternReverse?: boolean;
}


export interface IModuleDefinitionScript {

    moduleDefinition: IModuleDefinition;
    order: number;
}


export interface IModuleDefinitionExport {

    moduleName: string;
    dependencies: string[];
    scripts: string[];
}


export interface IModuleDefinition {

    moduleName: string;
    filePath: string;
    fileDir: string;
    dependencies: string[];    
    scripts: string[];
    physicalPaths: any;
    order?: number;

    parentModules: IModuleDefinition[];
    dependenciesModules: IModuleDefinition[];
}


export interface IModulePaths {

    paths: any;
}
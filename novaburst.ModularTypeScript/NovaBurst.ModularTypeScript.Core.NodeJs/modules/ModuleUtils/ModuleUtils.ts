///<reference path="../../Scripts/typings/node/node.d.ts" />

import fs = require('fs');
import path = require('path');


export class ModuleBundling {

    // associated module directory
    private moduleDirectory: ModuleDirectory;

    // bundle maps (bundles and the associated files)
    private moduleBundleMaps: IModuleBundleMap[];


    constructor(public options: IModuleBundlingOptions) {

        var ctx = this;

        // create module directory for managing modules
        ctx.moduleDirectory = new ModuleDirectory(options.basePath);

        // get all bundle maps
        ctx.moduleBundleMaps = ctx.getBundleMaps();
    }


    public writeBundleMapsJson(destFilePath: string) {
        var ctx = this;

        // get bundle maps
        var maps = ctx.getBundleMapsExports();

        // stringify
        var mapsJson = JSON.stringify(maps, null, 4);

        // write file to path
        fs.writeFileSync(destFilePath, mapsJson);
    }

    private getBundleMapsExports(): IModuleBundleMapExport[]{
        var ctx = this;

        var bundleMapsExports = [];

        // get bundle maps
        var bundleMaps = ctx.getBundleMaps();

        if (bundleMaps && bundleMaps.length > 0) {

            bundleMaps.forEach(bundleMap => {

                var physicalFilePaths: string[] = [];
                var relativeFilePaths: string[] = [];

                if (bundleMap.files && bundleMap.files.length > 0) {

                    bundleMap.files.forEach(bundleMapFile => {

                        // create a file path relative to the desired path
                        var relativeFilePath = bundleMapFile.relativePath;

                        relativeFilePaths.push(relativeFilePath);
                        physicalFilePaths.push(bundleMapFile.path);
                    });
                }

                var bundleMapExport: IModuleBundleMapExport =
                    {
                        physicalFilePaths: physicalFilePaths,
                        relativeFilePaths: relativeFilePaths,
                        physicalOutPath: bundleMap.out,
                        relativeOutPath: ModuleDirectory.getModuleFileRelativePath(bundleMap.out)
                    };

                bundleMapsExports.push(bundleMapExport);
            });
        }

        return bundleMapsExports;
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
                        ctx.addBundleMapFilesToGroup(groups, moduleJsonMatch, modDef.filePath, modDef, bundleFile);
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
                                    ctx.addBundleMapFilesToGroup(groups, match, absScriptPath, modDef, bundleFile);
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

            var formattedOutPath = ctx.formatStringUsingGroupNames(bundle.out, group.patternGroups);

            // order bundle map files by bundle order and the order that file has within the bundle
            var orderedBundleMapFiles = ctx.orderBundleMapFiles(group.files);

            // create bundle map
            var map: IModuleBundleMap =
                {
                    bundle: bundle,
                    groupName: groupName,
                    patternGroups: group.patternGroups,
                    files: orderedBundleMapFiles,
                    out: formattedOutPath
                };

            // add map to collection
            maps.push(map);
        }

        return maps;
    }

    /*
     * Order bundle map files by bundle order and the order that file has within the bundle.
     */
    private orderBundleMapFiles(bundleMapFiles: IModuleBundleMapFile[]): IModuleBundleMapFile[] {
        var ctx = this;

        var map = {};

        bundleMapFiles.forEach(bundleMapFile => {
            var fileOrder = ctx.moduleDirectory.getModuleDefinitionFileOrder(bundleMapFile.relativePath);
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

    private addBundleMapFilesToGroup(groups: any, match: RegExpExecArray, absScriptPath: string, modDef: IModuleDefinition, bundleFile: IModuleBundleFile) {
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
        var bundleMapFiles = ctx.createBundleMapFiles(absScriptPath, modDef, bundleFile);

        group.files.push.apply(group.files, bundleMapFiles);
    }

    /*
     * Create bundle map file.
     */
    private createBundleMapFiles(filePath: string, modDef: IModuleDefinition, bundleFile: IModuleBundleFile): IModuleBundleMapFile[] {
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
                        var scriptBundleMapFiles = ctx.createBundleMapFiles(scriptPathAbs, modDef, bundleFile);

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
                        relativePath: ModuleDirectory.getModuleFileRelativePath(filePath),
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
                    relativePath: ModuleDirectory.getModuleFileRelativePath(filePath),
                    isLocal: false
                });
        }

        return bundleMapFiles;
    }
}


export class ModuleDirectory {

    public static moduleJsonPathRegex = new RegExp("modules\\\\([^\\\\]+)\\\\module\\.json$", "i");
    public static moduleFilePathRegex = new RegExp("(modules\\\\.+)\\.js$", "i");

    public moduleDefinitions: IModuleDefinition[];

    private moduleDefinitionsMapOfNames: any = {};

    private moduleDefinitionsFilesOrder: any = {};

    private moduleDefintionsLeaves: IModuleDefinition[];


    constructor(
        public basePath: string) {

        var ctx = this;

        // get all module definitions
        ctx.moduleDefinitions = ctx.getModulesDefinitions();

        // create map of names
        ctx.createModuleDefinitionsMapOfNames();

        // assign module definitions dependencies
        ctx.assignModuleDependencies();

        // determine modules leaves
        ctx.determineModuleLeaves();

        // foreach module definition set the associated order as seen in the module definition tree (formed by dependencies)
        ctx.setModuleTreeOrder();

        // create order of all module files
        ctx.createModuleDefinitionsFilesOrderMap();
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
     * Set order of each module definition.
     */
    private setModuleTreeOrder() {
        var ctx = this;

        if (!ctx.moduleDefinitions || ctx.moduleDefinitions.length == 0) {
            return;
        }

        var currentOrder = 1;


        // foreach module definition set the associated order
        ctx.moduleDefintionsLeaves.forEach(modDef => {

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
    }

    /*
     * Parse module tree from bottom to top.
     */
    public parseModuleTree(moduleDef: IModuleDefinition, moduleFunc: (moduleDef: IModuleDefinition) => void) {
        var ctx = this;

        // current module
        moduleFunc(moduleDef);

        // parse dependencies
        if (moduleDef.parentModules && moduleDef.parentModules.length > 0) {
            moduleDef.parentModules.forEach(parentModDef => {

                ctx.parseModuleTree(parentModDef, moduleFunc);
            });
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
    }

    private determineModuleLeaves() {
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

        ctx.moduleDefintionsLeaves = leavesModules;
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

    // get modules
    private getModulesDefinitions(): IModuleDefinition[] {
        var ctx = this;

        var moduleDefLst: IModuleDefinition[] = [];

        // get all module.json files
        var files = ModuleDirectory.getDirectoryFiles(ctx.basePath, ModuleDirectory.moduleJsonPathRegex);

        // foreach file get its module
        files.forEach(file => {
            var moduleDef = ModuleDirectory.getModuleDefinition(file);
            moduleDefLst.push(moduleDef);
        });

        return moduleDefLst;
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
}


export interface IModuleBundleMapExport {

    physicalFilePaths: string[]
    relativeFilePaths: string[];
    physicalOutPath: string;
    relativeOutPath: string;
}


export interface IModuleBundleMap {

    bundle: IModuleBundle;
    groupName: string;
    patternGroups: string[];
    files: IModuleBundleMapFile[];
    out: string;
}


export interface IModuleBundleMapFile {

    parentModule: IModuleDefinition;
    bundleFile: IModuleBundleFile;
    path: string;
    relativePath: string;
    isLocal: boolean;
    order?: number;
}


export interface IModuleBundlingOptions {

    basePath: string;
    bundles: IModuleBundle[];
}


export interface IModuleBundle {

    files: IModuleBundleFile[];
    out: string;
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


export interface IModuleDefinition {

    moduleName: string;
    filePath: string;
    fileDir: string;
    dependencies: string[];    
    scripts: string[];
    order?: number;

    parentModules: IModuleDefinition[];
    dependenciesModules: IModuleDefinition[];
}
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


    public writeBundleMapsJson(destFilePath: string, makeRelativePathFunc: (string) => string) {
        var ctx = this;

        // get bundle maps
        var maps = ctx.getBundleMapsExports(makeRelativePathFunc);

        // stringify
        var mapsJson = JSON.stringify(maps, null, 4);

        // write file to path
        fs.writeFileSync(destFilePath, mapsJson);
    }

    private getBundleMapsExports(makeRelativePathFunc: (string) => string): IModuleBundleMapExport[]{
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
                        var relativeFilePath = makeRelativePathFunc(bundleMapFile.path);

                        relativeFilePaths.push(relativeFilePath);
                        physicalFilePaths.push(bundleMapFile.path);
                    });
                }

                var bundleMapExport: IModuleBundleMapExport =
                    {
                        physicalFilePaths: physicalFilePaths,
                        relativeFilePaths: relativeFilePaths,
                        physicalOutPath: bundleMap.out,
                        relativeOutPath: makeRelativePathFunc(bundleMap.out)
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

            // create bundle map
            var map: IModuleBundleMap =
                {
                    bundle: bundle,
                    groupName: groupName,
                    patternGroups: group.patternGroups,
                    files: group.files,
                    out: bundle.out
                };

            // add map to collection
            maps.push(map);
        }

        return maps;
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
                    isLocal: false
                });
        }

        return bundleMapFiles;
    }
}


export class ModuleDirectory {

    public static moduleJsonRegex = RegExp("([^\\\\]+)\\\\(([^\\.\\\\]+)\\.)*module\\.json$", "i");

    public moduleDefinitions: IModuleDefinition[];

    private moduleDefinitionsMapOfNames: any = {};

    private moduleDefinitionsMapOfFileNames: any = {};


    constructor(
        public basePath: string) {

        var ctx = this;

        // get all module definitions
        ctx.moduleDefinitions = ctx.getModulesDefinitions();

        // create map of names
        ctx.createModuleDefinitionsMapOfNames();

        //// create map of file names
        //ctx.createModuleDefinitionsMapOfFileNames();
    }


    /*
     * Get module definition by module name.
     */
    public getModuleDefinitionByModuleName(moduleName: string): IModuleDefinition {
        var ctx = this;

        var modDef = ctx.createModuleDefinitionsMapOfNames[moduleName];

        return modDef;
    }

    ///*
    // * Get module definition by script path.
    // */
    //public getModuleDefinitionByIncludedScriptPath(scriptPath: string): IModuleDefinition {
    //    var ctx = this;

    //    var modDef = ctx.createModuleDefinitionsMapOfFileNames[scriptPath];

    //    return modDef;
    //}


    private createModuleDefinitionsMapOfNames() {
        var ctx = this;

        ctx.moduleDefinitionsMapOfNames = {};

        ctx.moduleDefinitions.forEach(modDef => {
            ctx.moduleDefinitionsMapOfNames[modDef.moduleName] = modDef;
        });
    }

    //private createModuleDefinitionsMapOfFileNames() {
    //    var ctx = this;

    //    ctx.moduleDefinitionsMapOfFileNames = {};

    //    // add to dictionary each file
    //    ctx.moduleDefinitions.forEach(modDef => {

    //        // get module directory
    //        var modDir = path.dirname(modDef.filePath);

    //        modDef.scripts.forEach(script => {

    //            // for each script path create an absolute path
    //            var scriptPath = path.resolve(path.join(modDir, script)).toLowerCase();

    //            ctx.createModuleDefinitionsMapOfFileNames[scriptPath] = scriptPath;
    //        });
    //    });
    //}


    // get modules
    private getModulesDefinitions(): IModuleDefinition[] {
        var ctx = this;

        var moduleDefLst: IModuleDefinition[] = [];

        // get all module.json files
        var files = ModuleDirectory.getDirectoryFiles(ctx.basePath, ModuleDirectory.moduleJsonRegex);

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

        var moduleNameMatch = ModuleDirectory.moduleJsonRegex.exec(moduleJsonPath);

        if (moduleNameMatch) {

            // module name determined from folder name
            var moduleName_folder = moduleNameMatch[1];
            // module name determined from file name
            var moduleName_file = moduleNameMatch[3];

            // prefer module name coming from file name before the name coming from folder name
            moduleName = moduleName_file ? moduleName_file : moduleName_folder;
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
    isLocal: boolean;
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
    order: number;
}
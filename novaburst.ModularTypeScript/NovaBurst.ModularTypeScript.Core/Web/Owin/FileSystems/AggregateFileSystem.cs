using Microsoft.Owin.FileSystems;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Core
{
    /// <summary>
    /// Handle a collection of file systems.
    /// </summary>
    public class AggregateFileSystem : IFileSystem
    {
        // list of file systems
        private readonly IEnumerable<FileSystemMapping> _fileSystems;

        // tree of file system nodes
        private readonly FileSystemChildNode _rootNode;

        public AggregateFileSystem(IEnumerable<FileSystemMapping> fileSystems)
        {
            // file systems mappings
            _fileSystems = fileSystems;

            // create tree
            _rootNode = new FileSystemChildNode(string.Empty);
            _rootNode.Add(fileSystems);
        }

        public static AggregateFileSystem FromWebUiPhysicalPaths(string rootDir)
        {
            // UI assembly locations
            string[] rootDirs = Directory.GetDirectories(rootDir, "*.UI");

            // common paths under root paths and also as request paths
            string[] commonPaths = new string[]
            {
                @"content",
                @"scripts",
                @"modules",
                @"fonts",
                @"views"
            };

            var fileSystem = FromPhysicalPaths(rootDirs, commonPaths);

            return fileSystem;
        }

        public static AggregateFileSystem FromPhysicalPaths(IEnumerable<string> rootDirs, IEnumerable<string> commonPaths)
        {
            // create a list of file system mappings
            var fileSystems =
                from rootDir in rootDirs
                from commonPath in commonPaths
                let reqCommonPath = commonPath.Replace(@"\", "/")
                let rootCommonDir = Path.Combine(rootDir, commonPath).Replace(@"\", "/")
                where Directory.Exists(rootCommonDir)
                select new FileSystemMapping(reqCommonPath, new PhysicalFileSystem(rootCommonDir));

            return new AggregateFileSystem(fileSystems);
        }

        public bool TryGetDirectoryContents(string subpath, out IEnumerable<IFileInfo> contents)
        {
            bool found = _rootNode.GetFiles(subpath, out contents);
            return found;
        }

        public bool TryGetFileInfo(string subpath, out IFileInfo fileInfo)
        {
            bool found = _rootNode.GetFile(subpath, out fileInfo);
            return found;
        }
    }
}

using Microsoft.Owin.FileSystems;
using System;
using System.Collections.Generic;
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

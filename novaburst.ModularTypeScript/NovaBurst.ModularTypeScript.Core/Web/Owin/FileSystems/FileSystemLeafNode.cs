using Microsoft.Owin.FileSystems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Core
{
    public class FileSystemLeafNode : FileSystemNode
    {
        private readonly IFileSystem _fileSystem;

        public IFileSystem FileSystem { get { return _fileSystem; } }


        public FileSystemLeafNode(IFileSystem fileSystem)
        {
            this._fileSystem = fileSystem;
        }


        /// <summary>
        /// Get files.
        /// </summary>
        /// <param name="path"> Path to search for files.. </param>
        /// <param name="files"> Files. </param>
        /// <returns> Wether the path was found or not. </returns>
        public override bool GetFiles(string path, List<string> currentPath, Queue<string> remainingPathParts, out IEnumerable<IFileInfo> files)
        {
            var found = this.FileSystem.TryGetDirectoryContents(path, out files);
            return found;
        }

        /// <summary>
        /// Get one file.
        /// </summary>
        /// <param name="path"> File path. </param>
        /// <param name="file"> File. </param>
        /// <returns> Whether the file was found or not. </returns>
        public override bool GetFile(string path, List<string> currentPath, Queue<string> remainingPathParts, out IFileInfo file)
        {
            string currentPathStr = this.GetPathString(currentPath);
            path = path.Substring(currentPathStr.Length);

            var found = this.FileSystem.TryGetFileInfo(path, out file);
            return found;
        }
    }
}

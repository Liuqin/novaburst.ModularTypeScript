using Microsoft.Owin.FileSystems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Core
{
    /// <summary>
    /// Mapping between a file system and a virtual path under which current files will be seen.
    /// </summary>
    public class FileSystemMapping
    {
        /// <summary>
        /// Virtual path.
        /// </summary>
        public string Path { get; set; }

        /// <summary>
        /// File system.
        /// </summary>
        public IFileSystem FileSystem { get; set; }


        /// <summary>
        /// Ctor.
        /// </summary>
        /// <param name="path"> Virtual path. </param>
        /// <param name="fileSystem"> File system. </param>
        public FileSystemMapping(string path, IFileSystem fileSystem)
        {
            this.Path = path;
            this.FileSystem = fileSystem;
        }
    }
}

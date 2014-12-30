using Microsoft.Owin.FileSystems;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Core
{
    /// <summary>
    /// File system node
    /// </summary>
    public abstract class FileSystemNode
    {
        /// <summary>
        /// Node child leaves.
        /// </summary>
        protected List<FileSystemLeafNode> ChildLeaves { get; set; }

        /// <summary>
        /// Node children.
        /// </summary>
        protected Dictionary<string, List<FileSystemChildNode>> Children { get; set; }


        public FileSystemNode()
        {
            this.ChildLeaves = new List<FileSystemLeafNode>();
            this.Children = new Dictionary<string, List<FileSystemChildNode>>();
        }

        /// <summary>
        /// Add file system mappings.
        /// </summary>
        /// <param name="mappingList"> File system mappings. </param>
        public void Add(IEnumerable<FileSystemMapping> mappingList)
        {
            foreach (var mapping in mappingList)
            {
                Add(mapping);
            }
        }

        /// <summary>
        /// Add file system mapping.
        /// </summary>
        /// <param name="mapping"> File system mapping. </param>
        public void Add(FileSystemMapping mapping)
        {
            // get path parts
            var pathParts = this.GetPathParts(mapping.Path);

            // add mapping
            Add(mapping, pathParts);
        }

        /// <summary>
        /// Add mapping.
        /// </summary>
        /// <param name="mapping"></param>
        /// <param name="remainingPathParts"></param>
        protected void Add(FileSystemMapping mapping, Queue<string> remainingPathParts)
        {
            // if there are more path parts then add another child node else add a new leaf node
            if (remainingPathParts.Count > 0)
            {
                // get current path part
                string pathPart = remainingPathParts.Dequeue();

                // create child node
                var childNode = new FileSystemChildNode(pathPart);

                // add child node
                this.AddChildNode(childNode);

                // add remaining path
                childNode.Add(mapping, remainingPathParts);
            }
            else
            {
                // create leaf node
                var leafNode = new FileSystemLeafNode(mapping.FileSystem);

                // add leaf node
                this.AddLeafNode(leafNode);
            }
        }

        protected void AddLeafNode(FileSystemLeafNode leafNode)
        {
            this.ChildLeaves.Add(leafNode);
            return;
        }

        protected void AddChildNode(FileSystemChildNode childNode)
        {
            List<FileSystemChildNode> children;

            if (this.Children.TryGetValue(childNode.Name, out children) == false)
            {
                children = new List<FileSystemChildNode>();
                this.Children.Add(childNode.Name, children);
            }

            children.Add(childNode);
        }

        public bool GetFiles(string path, out IEnumerable<IFileInfo> files)
        {
            Queue<string> remainingPathParts = this.GetPathParts(path);

            bool found = this.GetFiles(path, new List<string>(), remainingPathParts, out files);
            return found;
        }

        /// <summary>
        /// Get files.
        /// </summary>
        /// <param name="path"> Path to search for files.. </param>
        /// <param name="files"> Files. </param>
        /// <returns> Wether the path was found or not. </returns>
        public abstract bool GetFiles(string path, List<string> currentPath, Queue<string> remainingPathParts, out IEnumerable<IFileInfo> files);

        public bool GetFile(string path, out IFileInfo file)
        {
            Queue<string> remainingPathParts = this.GetPathParts(path);

            bool found = this.GetFile(path, new List<string>(), remainingPathParts, out file);
            return found;
        }

        /// <summary>
        /// Get one file.
        /// </summary>
        /// <param name="path"> File path. </param>
        /// <param name="file"> File. </param>
        /// <returns> Whether the file was found or not. </returns>
        public abstract bool GetFile(string path, List<string> currentPath, Queue<string> remainingPathParts, out IFileInfo file);

        protected Queue<string> GetPathParts(string path)
        {
            Queue<string> remainingPathParts = new Queue<string>(path.Split(new char[] { '/' }, StringSplitOptions.RemoveEmptyEntries).Select(p => p.ToLower()));
            return remainingPathParts;
        }

        protected string GetPathString(IEnumerable<string> currentPath)
        {
            string currentPathStr = "/" + (currentPath.Count() > 0 ? currentPath.Aggregate((p1, p2) => string.Format("{0}/{1}", p1, p2)) : string.Empty);
            return currentPathStr;
        }
    }
}

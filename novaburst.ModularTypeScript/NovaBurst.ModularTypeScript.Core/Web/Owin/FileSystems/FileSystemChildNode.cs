using Microsoft.Owin.FileSystems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Core
{
    public class FileSystemChildNode : FileSystemNode
    {
        private readonly string _name;

        public string Name { get { return _name; } }


        public FileSystemChildNode(string name)
        {
            this._name = name;
        }


        /// <summary>
        /// Get files.
        /// </summary>
        /// <param name="path"> Path to search for files.. </param>
        /// <param name="splitStr"> Split string to split path into parts. </param>
        /// <param name="files"> Files. </param>
        /// <returns> Wether the path was found or not. </returns>
        public override bool GetFiles(string path, List<string> currentPath, Queue<string> remainingPathParts, out IEnumerable<IFileInfo> files)
        {
            bool found = false;

            List<IFileInfo> resultingFiles = new List<IFileInfo>();


            foreach (var leaf in this.ChildLeaves.ToList())
            {
                IEnumerable<IFileInfo> leafFiles = null;
                found = found || leaf.GetFiles(path, currentPath, remainingPathParts, out leafFiles);

                if (leafFiles != null && leafFiles.Count() > 0)
                {
                    resultingFiles.AddRange(leafFiles);
                }
            }


            if (remainingPathParts.Count > 0)
            {
                // get next path part
                string pathPart = remainingPathParts.Dequeue().ToLower();

                var newCurrentPath = new List<string>(currentPath);
                newCurrentPath.Add(pathPart);

                List<FileSystemChildNode> childNodes = null;

                // search for path part
                this.Children.TryGetValue(pathPart, out childNodes);

                if (found && childNodes != null && childNodes.Count > 0)
                {
                    string[] remainingPathPartsClone = remainingPathParts.ToArray();

                    foreach (var childNode in childNodes)
                    {
                        Queue<string> nodeRemainingParts = new Queue<string>(remainingPathPartsClone);

                        IEnumerable<IFileInfo> nodeFiles = null;

                        found = found || childNode.GetFiles(path, newCurrentPath, nodeRemainingParts, out nodeFiles);

                        resultingFiles.AddRange(nodeFiles);
                    }
                }
            }
            else
            {
                // add also child nodes as folders
                foreach (var childNode in this.Children.SelectMany(el => el.Value))
                {
                    string currentPathStr = this.GetPathString(currentPath);
                    DirectoryFileInfo dir = new DirectoryFileInfo(currentPathStr, childNode.Name);
                    resultingFiles.Add(dir);
                    found = true;
                }
            }


            files = resultingFiles;
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
            bool found = false;

            file = null;

            if (!found)
            {
                // if no remaining path part then search using the corresponding file system
                foreach (var leaf in this.ChildLeaves.ToList())
                {
                    found = leaf.GetFile(path, currentPath, remainingPathParts, out file);

                    if (found)
                    {
                        break;
                    }
                }
            }

            if (!found && remainingPathParts.Count > 1)
            {
                // get next path part
                string pathPart = remainingPathParts.Dequeue().ToLower();

                var newCurrentPath = new List<string>(currentPath);
                newCurrentPath.Add(pathPart);

                List<FileSystemChildNode> childNodes = null;

                // search for path part
                this.Children.TryGetValue(pathPart, out childNodes);

                if (childNodes != null && childNodes.Count > 0)
                {
                    string[] remainingPathPartsClone = remainingPathParts.ToArray();

                    foreach (var childNode in childNodes)
                    {
                        Queue<string> nodeRemainingParts = new Queue<string>(remainingPathPartsClone);

                        found = childNode.GetFile(path, newCurrentPath, nodeRemainingParts, out file);

                        if (found)
                        {
                            break;
                        }
                    }
                }
            }

            return found;
        }
    }
}

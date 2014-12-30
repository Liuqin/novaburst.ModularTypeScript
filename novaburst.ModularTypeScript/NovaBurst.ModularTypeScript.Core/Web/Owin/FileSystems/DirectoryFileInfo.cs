using Microsoft.Owin.FileSystems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Core
{
    public class DirectoryFileInfo : IFileInfo
    {
        private readonly string _name;
        private readonly string _path;


        public System.IO.Stream CreateReadStream()
        {
            throw new NotImplementedException();
        }

        public bool IsDirectory
        {
            get { return true; }
        }

        public DateTime LastModified
        {
            get { throw new NotImplementedException(); }
        }

        public long Length
        {
            get { return 0; }
        }

        public string Name
        {
            get { return _name; }
        }

        public string PhysicalPath
        {
            get { return _path; }
        }


        public DirectoryFileInfo(string path, string name)
        {
            this._path = path;
            this._name = name;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Front.Host
{
    /// <summary>
    /// Information that states how module files will be boundled.
    /// </summary>
    public class ModuleBundle
    {
        /// <summary>
        /// Module dependencies.
        /// </summary>
        public string[] Dependencies { get; set; }

        /// <summary>
        /// Scripts required to be included into bundle.
        /// </summary>
        public string[] Scripts { get; set; }
    }
}

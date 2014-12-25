using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Front.Host
{
    /// <summary>
    /// Thrown if the Front host configuration section was not found.
    /// </summary>
    public class FrontHostConfigNotFoundException : Exception
    {
        /// <summary>
        /// Config section name that was not found.
        /// </summary>
        public string SectionName { get; set; }


        /// <summary>
        /// Ctor.
        /// </summary>
        /// <param name="sectionName"> Config section name that was not found. </param>
        public FrontHostConfigNotFoundException(string sectionName)
        {
            this.SectionName = sectionName;
        }
    }
}

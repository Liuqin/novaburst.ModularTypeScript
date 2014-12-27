using Microsoft.Owin.StaticFiles.ContentTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Front
{
    public class FileServerContentTypeProvider : FileExtensionContentTypeProvider
    {
        public FileServerContentTypeProvider()
        {
            Mappings.Add(".json", "application/json");
        }
    }
}

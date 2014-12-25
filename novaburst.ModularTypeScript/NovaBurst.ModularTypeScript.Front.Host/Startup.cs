using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Front.Host
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // use a file server to serve all static content (js, css, content, html, ...) and also configure default files (eg: index.html to be the default entry point)

            // get host config
            FrontHostConfig config = FrontHostConfig.GetDefault();

            // setup default documents
            app.UseDefaultFiles(new DefaultFilesOptions
            {
                FileSystem = new PhysicalFileSystem(config.WebsiteLocation),
                DefaultFileNames = new List<string>
                {
                    "views/index.html"
                }
            });

            // start file server to share website static content
            // wrapper around: StaticFiles + DefaultFiles + DirectoryBrowser
            app.UseFileServer(new FileServerOptions
            {
                EnableDirectoryBrowsing = false,
                FileSystem = new PhysicalFileSystem(config.WebsiteLocation)
            });
        }
    }
}

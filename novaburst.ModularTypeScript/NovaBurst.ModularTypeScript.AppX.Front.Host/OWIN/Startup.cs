﻿using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using NovaBurst.ModularTypeScript.Core.Web.Bundling;
using Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.AppX.Front.Host
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // get host config
            HostConfig config = HostConfig.GetDefault();

            // bundle and minify all modules
            ModuleBundling.BundleAll(Path.Combine(config.WebsiteLocation, "modules"));


            // use a file server to serve all static content (js, css, content, html, ...) and also configure default files (eg: index.html to be the default entry point)

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
            var fileServerOptions = new FileServerOptions
            {
                EnableDirectoryBrowsing = false,
                FileSystem = new PhysicalFileSystem(config.WebsiteLocation),
            };

            fileServerOptions.StaticFileOptions.ContentTypeProvider = new FileServerContentTypeProvider();

            app.UseFileServer(fileServerOptions);
        }
    }
}
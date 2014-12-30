using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Newtonsoft.Json.Serialization;
using NovaBurst.ModularTypeScript.Core;
using NovaBurst.ModularTypeScript.Core.Web.Bundling;
using Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace NovaBurst.ModularTypeScript.AppX.Front.Host
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // get host config
            HostConfig config = HostConfig.GetDefault();

            // bundle and minify all modules
            ModuleBundling.BundleAll(config.RootDirectory);


            ConfigureFileServer(app, config);

            ConfigureWebApi(app, config);
        }

        private void ConfigureFileServer(IAppBuilder app, HostConfig config)
        {
            // use a file server to serve all static content (js, css, content, html, ...) and also configure default files (eg: index.html to be the default entry point)

            // UI assembly locations
            string[] rootPaths = Directory.GetDirectories(config.RootDirectory, "*.UI");

            // common paths under root paths and also as request paths
            string[] commonPaths = new string[]
            {
                @"content",
                @"scripts",
                @"modules",
                @"fonts",
                @"views"
            };

            // create a list of file system mappings
            var fileSystems = 
                from rootPath in rootPaths
                from commonPath in commonPaths
                let reqCommonPath = commonPath.Replace(@"\", "/")
                let rootCommonPath = Path.Combine(rootPath, commonPath).Replace(@"\", "/")
                where Directory.Exists(rootCommonPath)
                select new FileSystemMapping(reqCommonPath, new PhysicalFileSystem(rootCommonPath));

            // create file system that will locate the files
            var fileSystem = new AggregateFileSystem(fileSystems);

            // setup default documents
            app.UseDefaultFiles(new DefaultFilesOptions
            {
                FileSystem = fileSystem,
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
                FileSystem = fileSystem,
            };

            fileServerOptions.StaticFileOptions.ContentTypeProvider = new FileServerContentTypeProvider();

            app.UseFileServer(fileServerOptions);
        }

        private void ConfigureWebApi(IAppBuilder app, HostConfig config)
        {
            HttpConfiguration httpConfig = new HttpConfiguration();

            // default routing - use routing attributes instead
            //httpConfig.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            // use routing attributes
            httpConfig.MapHttpAttributeRoutes();

            // remove XML formatter
            httpConfig.Formatters.Remove(httpConfig.Formatters.XmlFormatter);

            // camel case DTO property names
            var jsonSettings = httpConfig.Formatters.JsonFormatter.SerializerSettings;
            jsonSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
            jsonSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // make any configuration required by Sales API
            NovaBurst.ModularTypeScript.AppX.Sales.WebApi.WebApiConfig.Configure(httpConfig);

            // use Web API
            app.UseWebApi(httpConfig);

            // check for errors
            httpConfig.EnsureInitialized();
        }
    }
}
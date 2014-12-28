using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.AppX.Front.Host
{
    internal static class ProgramConsole
    {
        public static void Start()
        {
            // get host config
            HostConfig config = HostConfig.GetDefault();

            // start OWIN host using the Startup class which will configure current hosting
            using (WebApp.Start<Startup>(config.Url))
            {
                Console.WriteLine("Listening on {0}", config.Url);
                Console.WriteLine("Press any key to stop hosting.");
                Console.ReadLine();
            }
        }
    }
}

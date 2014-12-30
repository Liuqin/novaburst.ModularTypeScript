using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.AppX.Front.Host
{
    internal static class ProgramWindowsService
    {
        public static void Start()
        {
            ServiceBase[] ServicesToRun;

            ServicesToRun = new ServiceBase[] 
            { 
                new FrontWindowsService() 
            };

            // start Windows Service
            ServiceBase.Run(ServicesToRun);
        }
    }
}

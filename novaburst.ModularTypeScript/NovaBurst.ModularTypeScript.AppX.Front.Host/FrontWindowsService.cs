using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.AppX.Front.Host
{
    partial class FrontWindowsService : ServiceBase
    {
        IDisposable webApp;

        public FrontWindowsService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            // get host config
            HostConfig config = HostConfig.GetDefault();

            // start OWIN host using the Startup class which will configure current hosting
            webApp = WebApp.Start<Startup>(config.Url);
        }

        protected override void OnStop()
        {
            webApp.Dispose();
        }
    }
}

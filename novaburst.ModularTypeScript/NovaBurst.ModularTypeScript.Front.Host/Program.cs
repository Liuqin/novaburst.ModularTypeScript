using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Front.Host
{
    class Program
    {
        static void Main(string[] args)
        {
            // if there is no graphical representation (UserInteractive == false) then start as a windows service else start as a console application

            if (Environment.UserInteractive)
            {
                // start as a Console App
                ProgramConsole.Start();
            }
            else
            {
                // start as a Windows Service
                ProgramWindowsService.Start();
            }
        }
    }
}

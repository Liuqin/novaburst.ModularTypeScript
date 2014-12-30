using NovaBurst.ModularTypeScript.AppX.Core.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.AppX.Sales.WebApi.Models
{
    public class CustomerDto
    {
        public string Id { get; set; }
        public PersonDto Person { get; set; }
    }
}

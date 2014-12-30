using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.AppX.Core.WebApi.Models
{
    public class PersonAddressDto : AddressDto
    {
        public string PersonId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.AppX.Core.WebApi.Models
{
    public class PersonPhoneDto : PhoneDto
    {
        public string PersonId { get; set; }
        public PersonPhoneType Type { get; set; }
    }
}

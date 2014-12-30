using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.AppX.Core.WebApi.Models
{
    public class PersonDto
    {
        /*
                 public id: string;
        public firstName: string;
        public lastName: string;
        public middleName: string;

        public address: PersonAddress;
        public phone: PersonPhone;
         */

        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public PersonAddressDto Address { get; set; }
        public PersonPhoneDto Phone { get; set; }
    }
}

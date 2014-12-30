using NovaBurst.ModularTypeScript.AppX.Core.WebApi.Models;
using NovaBurst.ModularTypeScript.AppX.Sales.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace NovaBurst.ModularTypeScript.AppX.Sales.WebApi.Controllers
{
    [RoutePrefix("api/customer")]
    public class CustomerController : ApiController
    {
        [Route("{id}")]
        public HttpResponseMessage Get(string id)
        {
            var data = new CustomerDto
            {
                Id = "123",
                Person = new PersonDto
                {
                    Id = "99",
                    FirstName = "First",
                    LastName = "Last",
                    MiddleName = "Middle",
                    Phone = new PersonPhoneDto
                    {
                        PersonId = "99",
                        PhoneNumber = "123-123-123-123-123-123",
                        Type = PersonPhoneType.Home
                    },
                    Address = new PersonAddressDto
                    {
                        AddressLine1 = "ADDR1",
                        AddressLine2 = "ADDR2",
                        City = "CityX",
                        PersonId = "99"
                    }
                }
            };

            return this.Request.CreateResponse(HttpStatusCode.OK, data);
        }
    }
}

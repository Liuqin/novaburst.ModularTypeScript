using NovaBurst.ModularTypeScript.AppX.Sales.WebApi.Models;
using NovaBurst.ModularTypeScript.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Linq.Dynamic;

namespace NovaBurst.ModularTypeScript.AppX.Sales.WebApi.Controllers
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {
        [Route("{id}")]
        public HttpResponseMessage Get(string id)
        {
            return this.Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("")]
        public HttpResponseMessage Get([FromUri]ListOptions listOptions)
        {
            if (listOptions.FetchCount)
            {
                var count = GetDataCount();
                return this.Request.CreateResponse(HttpStatusCode.OK, count);
            }
            else
            {
                var lst = GetData(listOptions.PagingOptions, listOptions.OrderOptions);
                return this.Request.CreateResponse(HttpStatusCode.OK, lst);
            }
        }

        private IEnumerable<ProductDto> GetData()
        {
            List<ProductDto> lst = new List<ProductDto>();

            for (int index = 0; index <= 100; index++)
            {
                lst.Add(new ProductDto { Id = index.ToString(), Name = "Product " + index });
            }

            return lst;
        }

        private int GetDataCount()
        {
            var data = GetData();
            return data.Count();
        }

        private IEnumerable<ProductDto> GetData(PagingOptions pagingOptions, OrderOptions orderOptions)
        {
            var data = GetData();

            if (pagingOptions.Skip.HasValue)
            {
                data = data.Skip(pagingOptions.Skip.Value);
            }

            if (pagingOptions.Take.HasValue)
            {
                data = data.Take(pagingOptions.Take.Value);
            }

            if (orderOptions != null && orderOptions.Fields != null && orderOptions.Fields.Count() > 0)
            {
                string orderExpr = orderOptions.Fields.Select(f => string.Format("{0} {1}", f.FieldName, f.Ascending ? "ASC" : "DESC")).Aggregate((f1, f2) => string.Format("{0},{1}", f1, f2));
                data = data.OrderBy(orderExpr);
            }

            return data;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Core.Model
{
    public class ListOptions
    {
        public bool FetchCount { get; set; }
        public PagingOptions PagingOptions { get; set; }
        public OrderOptions OrderOptions { get; set; }
    }
}

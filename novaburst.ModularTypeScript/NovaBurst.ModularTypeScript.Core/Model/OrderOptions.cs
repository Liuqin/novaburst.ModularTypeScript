using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Core.Model
{
    public class OrderOptions
    {
        public IEnumerable<OrderOptionsField> Fields { get; set; }
    }
}

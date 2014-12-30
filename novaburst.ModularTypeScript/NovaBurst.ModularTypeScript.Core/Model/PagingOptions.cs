using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Core.Model
{
    public class PagingOptions
    {
        public int? Take { get; set; }

        public int? Skip { get; set; }

        public int? PageSize { get { return this.Take; } }

        public int PageIndex
        {
            get
            {
                if (this.Take == null || this.Take == 0 || this.Skip == null)
                    return 1;

                return (int)Math.Floor(this.Skip.Value / (double)this.Take.Value) + 1;
            }
        }
    }
}

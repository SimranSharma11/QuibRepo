using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models.DataModels
{
    [Keyless]
   public class Poster
    {
        public string PosterContent { get; set; }
    }
}

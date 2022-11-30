using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models.DataModels
{
    public class movies
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Director { get; set; }
        public int ReleaseYear { get; set; }
        public int Length { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? IsActive { get; set; }
       public string PosterContent { get; set; }
        public string? PosterContentThumb { get; set; }

    }
}

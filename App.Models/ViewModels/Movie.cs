using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models.ViewModels
{
    public class Movie
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int Length { get; set; }
        public string? PosterContentThumb { get; set; }
        public int ReleaseYear { get; set; }
        public string? Director { get; set; }
        public bool IsActive{ get; set; }
    }
}

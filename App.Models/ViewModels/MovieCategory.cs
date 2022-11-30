using App.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models.ViewModels
{
    public class MovieCategory
    {
        public List<Movie>? movie;
        public List<RecentQuibs>? recentQuibs;
        public List<MostActiveQuibs>? mostActiveQuibs;
    }
}

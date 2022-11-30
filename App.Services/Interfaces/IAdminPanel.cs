using App.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
  
    public interface IAdminPanel
    {
        public List<Length> GetMovieLength(int MovieId);
    }
}

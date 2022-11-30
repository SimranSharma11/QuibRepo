using App.Data;
using App.Models.DataModels;
using App.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services
{
   public class AdminPanel:IAdminPanel
    {
        private readonly AppDbContext _appDbContext;

        public AdminPanel(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public List<Length> GetMovieLength(int MovieId)
        {
            return _appDbContext.length.FromSqlRaw("Call GetMovieLengthById(" + MovieId + ")").ToList();
        }
    }
}

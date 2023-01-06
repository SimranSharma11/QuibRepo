using App.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IQuibStreamService
    {
        public IQueryable<quibs> AddQuib(quibs quib);
        public void DeleteQuibById(int Id);
        public IQueryable<quibs> UpdateQuibPostedDate(int Id,string Body,int Time);
        public void AddBump(int quibId,string UserId,int MovieId);
        public void DeleteBump(int quibId, int UserId, int MovieId);
        public List<QuibStream> GetQuibByUserIdAndMovieId(int MovieId, string UserId);

    }
}

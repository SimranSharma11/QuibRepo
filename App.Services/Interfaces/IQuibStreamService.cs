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
        public IQueryable<quibs> UpdateQuibPostedDate(int Id,string Body);
    }
}

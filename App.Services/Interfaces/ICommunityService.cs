using App.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface ICommunityService
    {
        public void AddUpdateCommunity(string FollowerId,string FolloweeId);
    }
}

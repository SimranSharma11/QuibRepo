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
    public class CommunityService: ICommunityService
    {
        private readonly AppDbContext _appDbContext;

        public CommunityService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public void AddUpdateCommunity(string FollowerId, string FolloweeId) { 
        var p_FollowerId = FollowerId;
        var p_FolloweeId = FolloweeId;
        var add = _appDbContext.communitys.FromSqlRaw("call AddUpdatecommunity('"+ p_FollowerId + "','" + p_FolloweeId + "');");
        }
    }
}

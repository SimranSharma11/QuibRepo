using App.Data;
using App.Models.DataModels;
using App.Models.ViewModels;
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
        //public IQueryable<bool>? IsUserFollower(string FollowerId, string FolloweeId)
        //{
        //    var p_FollowerId = FollowerId;
        //    var p_FolloweeId = FolloweeId;
        //    var isUserFollower = _appDbContext.isfollowed.FromSqlRaw("call IsUserFollower("+ p_FollowerId + "," + p_FolloweeId + ");");
        //    return isUserFollower;
        //}
        public bool IsUserFollowed(string FollowerId, string FolloweeId)
        {
            bool isUserFollowed;
            community user = _appDbContext.communitys.FirstOrDefault(x => x.newFollowerId == FollowerId && x.newFolloweeId == FolloweeId);
            if (user != null)
            {
                isUserFollowed = true;
            }
            else
            {
                isUserFollowed = false;
            }
            return isUserFollowed;
        }
        public ApplicationUser GetUserById(string UserId)
        {
            var @p_Id = UserId;
            var user = _appDbContext.applicationUsers.FirstOrDefault(x=> x.Id == UserId);
            return user;
        }
        public List<AspNetUsers> GetFollowerId(string UserId)
        {
            var p_UserId = UserId;
            var list = _appDbContext.list.FromSqlRaw("call GetFollowersByUserId('" + p_UserId + "');").ToList();
            return list;
        }
        public List<AspNetUsers> GetFolloweeId(string UserId)
        {
            var p_UserId = UserId;
            var list = _appDbContext.list.FromSqlRaw("call GetfolloweesByUserId('" + p_UserId + "');").ToList();
            return list;    
            
        }
        public List<Movie> GetMovieByUserId(string UserId)
        {
           var p_UserId = UserId;
            var list = _appDbContext.movie.FromSqlRaw("call GetmoviesByUserId('" + p_UserId + "');").ToList();
            return list;
        }
    }
}

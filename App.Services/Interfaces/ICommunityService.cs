using App.Models.DataModels;
using App.Models.ViewModels;
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
        public bool IsUserFollowed(string FollowerId, string FolloweeId);
        /*public bool IsUserFollower(string FollowerId,string FolloweeId)*/
        public ApplicationUser GetUserById(string UserId);
       public List<AspNetUsers> GetFollowerId(string UserId);
        public List<AspNetUsers> GetFolloweeId(string UserId);
        public List<Movie> GetMovieByUserId(string UserId);
     }
}

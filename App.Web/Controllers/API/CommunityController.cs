using App.Models.DataModels;
using App.Models.ViewModels;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommunityController : ControllerBase
    {
        private readonly ICommunityService _communityService;

        public CommunityController(ICommunityService communityService)
        {
            _communityService = communityService;
        }
        [HttpPost]
        [Route("AddUpdateCommunity")]
        public void AddUpdateCommunity( string FollowerId,string FolloweeId)
        { 
        _communityService.AddUpdateCommunity(FollowerId, FolloweeId);
        }
        [HttpGet]
        [Route("isUserFollowed")]
        public bool isUserFollowed(string FollowerId, string FolloweeId)
        { 
             return  _communityService.IsUserFollowed(FollowerId, FolloweeId);
        }
        [HttpGet]
        [Route("GetUserById")]
        public ApplicationUser GetUserById(string UserId) { 
        return _communityService.GetUserById(UserId);   
        }
        [HttpGet]
        [Route("GetFollowerId")]
        public List<AspNetUsers> GetFollowerId(string UserId)
        {
            return _communityService.GetFollowerId(UserId);
        }
        [HttpGet]
        [Route("GetFolloweeIdByUserId")]
        public List<AspNetUsers> GetFolloweeIdByUserId(string UserId)
        {
            return _communityService.GetFolloweeId(UserId);
        }
        [HttpGet]
        [Route("GetMovieByUserId")]
        public List<Movie> GetMovieByUserId(string UserId)
        {
            return _communityService.GetMovieByUserId(UserId);
        }
    }
}

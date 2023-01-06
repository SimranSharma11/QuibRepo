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
        public void AddUpdateCommunity( string FollowerId,string FolloweeId)
        { 
        _communityService.AddUpdateCommunity(FollowerId, FolloweeId);
        }
    }
}

using App.Models.DataModels;
using App.Models.ViewModels;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuibStreamController : ControllerBase
    {
        private readonly IMovieService _movieService;
        private readonly IAdminPanel _adminPanel;
        private readonly IQuibStreamService _quibStreamService;
        private readonly UserManager<ApplicationUser> _userManager;

        public QuibStreamController(IMovieService movieService, IAdminPanel adminPanel, IQuibStreamService quibStreamService, UserManager<ApplicationUser> userManager)
        {
            _movieService = movieService;
            _adminPanel = adminPanel;
            _quibStreamService = quibStreamService;
            _userManager = userManager;
        }
        [HttpGet]
        [Route("/GetQuibsById")]
        public List<App.Models.DataModels.QuibStream> GetQuibsByMovieId(int MovieId, bool QuibZero)
        {
            return _movieService.GetQuibsByMovieId(MovieId, QuibZero);

        }
        [HttpGet]
        [Route("GetAllQuibTime")]
        public List<time> GetAllQuibTime(int MovieId)
        {
            //var MovieId = HttpContext.Session.GetInt32("MovieId");
            return _movieService.GetAllQuibTime(MovieId);
        }
        [HttpGet]
        [Route("GetMovieLength")]
        public List<Length> GetMovieLength(int MovieId)
        {
            //var MovieId = HttpContext.Session.GetInt32("MovieId");
            return _adminPanel.GetMovieLength(MovieId);
        }
        [HttpGet]
        [Route("/GetQuibsByMovieIdForInterval")]
        public List<App.Models.DataModels.QuibStream> GetQuibsByMovieIdForInterval(int MovieId, bool QuibZero, string SelectedStream, int StartTime)
        {
            return _movieService.GetQuibsByMovieIdForInterval(MovieId, QuibZero, SelectedStream, StartTime);

        }
        [HttpGet]
        [Route("/GetInitialQuibsByMovieId")]
        public List<App.Models.DataModels.QuibStream> GetInitialQuibsByMovieId(int MovieId, bool QuibZero, string SelectStream)
        {
            return _movieService.GetInitialQuibsByMovieId(MovieId, QuibZero, SelectStream);

        }
        [HttpGet]
        [Route("/GetQuibByUserIdAndMovieId")]
        public List<App.Models.DataModels.QuibStream> GetQuibByUserIdAndMovieId(int MovieId, string UserId)
        {
            
            return _quibStreamService.GetQuibByUserIdAndMovieId(MovieId, UserId);

        }
        [HttpPost]
        [Route("AddQuib")]
        public IQueryable<quibs> AddQuib(string body,string UserId, int ParentId,int Time,bool isSeedQuib,string isSeedQuibType,int MovieId,bool isScreenShot)
        { 
            quibs quib = new quibs();
            quib.Body = body;
            quib.Time = Time;   
            quib.IsSeedQuib= isSeedQuib;    
            quib.SeedQuibType= isSeedQuibType;
            quib.MovieId = MovieId;
            quib.newUserId = UserId;
            quib.ParentId = ParentId;
            quib.IsQuibZero = Time == 0 ? true : false;
            quib.IsScreenshot= isScreenShot;    
           return _quibStreamService.AddQuib(quib);
        }
        [HttpGet]
        [Route("validate")]
        public bool ValidateEmail(string email)
        {
            bool isValid = false;


            try
            {
                var user = _userManager.FindByEmailAsync(email);

                if (user.Result == null)
                {
                    isValid = true;
                }
              
            }
            catch (Exception ex)
            {

            }

            return isValid;
        }
        [HttpDelete]
        [Route("DeleteQuibById")]
        public void DeleteQuibById(int Id)
        {
            _quibStreamService.DeleteQuibById(Id);
        }
        [HttpPut]
        [Route("UpdateQuibPostedDate")]
        public IQueryable<quibs> UpdateQuibPostedDate(int QuibId, string Body)
        {
          return  _quibStreamService.UpdateQuibPostedDate(QuibId, Body);
        }

        [HttpPost]
        [Route("AddBump")]
        public void AddBump(int quibId, int userId, int movieId)
        {
         _quibStreamService.AddBump(quibId, userId, movieId);
        }

        [HttpDelete]
        [Route("DeleteBump")]
        public void DeleteBump(int quibId, int userId, int movieId)
        {
            _quibStreamService.DeleteBump(quibId, userId, movieId);
        }
    }
}

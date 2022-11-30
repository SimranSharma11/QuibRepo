using App.Models.DataModels;
using App.Services.Interfaces;
using App.Web.Controllers.API;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers
{
    public class QuibsStream : Controller
    {
        private readonly IMovieService _movieService;
        private readonly QuibStreamController _quibStreamController;
        private readonly IAdminPanel _adminPanel;

        public QuibsStream(IMovieService movieService, QuibStreamController quibStreamController,IAdminPanel adminPanel)
        {
            _movieService = movieService;
            _quibStreamController = quibStreamController;
            _adminPanel = adminPanel;
        }
        public IActionResult QuibStream(int MovieId, bool QuibZero)
        {
            TempData["MovieId"] = MovieId;
            var list = _movieService.GetQuibsByMovieId(MovieId, QuibZero);
            return View(list);
          
        }
        public List<time> GetAllQuibsTime()
        {
            return _movieService.GetAllQuibTime(33);
        }
        public List<Length> GetAllQuibsTimelength()
        {
           
            return _adminPanel.GetMovieLength(33);
        }
    }
}

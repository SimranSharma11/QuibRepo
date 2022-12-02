using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers
{
    public class ChooseMovie : Controller
    {
        private readonly IMovieService _movieService;

        public ChooseMovie(IMovieService movieService)
        {
            _movieService = movieService;
        }
        public IActionResult Index()
        {
           
            return View();

        }
        public IActionResult QuibStream(int MovieId, bool QuibZero)
        {
            HttpContext.Session.SetInt32("MovieId",MovieId);
           
            var list = _movieService.GetQuibsByMovieId(MovieId, QuibZero);
            return View(list);
        }
    }
}

using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Principal;

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
            
            HttpContext.Session.GetString("UserId");
            return View();

        }
        public IActionResult QuibStream(int MovieId, bool QuibZero)
        {
            HttpContext.Session.SetInt32("MovieId",MovieId);
           
            var list = _movieService.GetQuibsByMovieId(MovieId, QuibZero);
            return View(list);
        }
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return View("Index");  
        }
    }
}

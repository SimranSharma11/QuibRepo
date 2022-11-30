//using App.Models.DataModels;
using App.Data;
using App.Models.ViewModels;
using App.Services.Interfaces;
using App.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Dynamic;

namespace App.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IMovieService _movieService;

        public HomeController(ILogger<HomeController> logger,IMovieService movieService)
        {
            _logger = logger;
            _movieService = movieService;
        }

        public IActionResult Index()
        {
            return View();

        }
        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Movie()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public IActionResult ChooseMovies()
        {
            var mymodel = new MovieCategory();

            mymodel.movie = _movieService.GetALLMovie();
            mymodel.mostActiveQuibs = _movieService.GetALLMostActiveQuibs();
            mymodel.recentQuibs = _movieService.GetALLRecentQuibs();
            return View(mymodel);
        }
    }
}
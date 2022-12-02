using App.Models.DataModels;
using App.Models.ViewModels;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChooseMoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public ChooseMoviesController(IMovieService movieService)
        {
            _movieService = movieService;
        }
        //[HttpGet]
        //public MovieCategory Get()
        //{
        //    var mymodel = new MovieCategory();

        //    mymodel.movie = _movieService.GetALLMovie();
        //    mymodel.mostActiveQuibs = _movieService.GetALLMostActiveQuibs();
        //    mymodel.recentQuibs = _movieService.GetALLRecentQuibs();
        //    return mymodel;
        //}
        [HttpGet]
        [Route("/Movies")]
        public List<Movie> GetAllMovies()
        {
            var movieList = _movieService.GetALLMovie();
            return movieList;
        }

        [HttpGet]
        [Route("/ActiveMovies")]
        public List<MostActiveQuibs> GetAllMostActiveQuibs()
        {
            var movieList = _movieService.GetALLMostActiveQuibs();
            return movieList;
        }
        [HttpGet]
        [Route("/RecentMovies")]
        public List<RecentQuibs> GetAllRecentQuibs()
        {
            var movieList = _movieService.GetALLRecentQuibs();
            return movieList;
        }

        [HttpPost]
      
        public void AddMovies(movies movies)
        {
            _movieService.AddMovie(movies);
        }

        [HttpPost]
        [Route("/AddActiveMovies")]
        public void AddMostActiveQuibs(MostActiveQuibs mostActiveQuibs)
        {
            _movieService.AddMostActiveQuibs(mostActiveQuibs);

        }
        [HttpPost]
        [Route("/AddRecentMovies")]
        public void AddRecentQuibs(RecentQuibs recentQuibs)
        {
            _movieService.AddRecentQuibs(recentQuibs);

        }
        [HttpDelete]
        [Route("/DeleteMovies")]
        public void DeleteMovies(int Id)
        {
            _movieService.DeleteMovie(Id);
        }

        [HttpDelete]
        [Route("/DeleteActiveMovies")]
        public void AddMostActiveQuibs(int Id)
        {
            _movieService.DeleteMostActiveQuibs(Id);

        }
        [HttpDelete]
        [Route("/DeleteRecentMovies")]
        public void DeleteRecentQuibs(int Id)
        {
            _movieService.DeleteRecentQuibs(Id);

        }

        [HttpPut]
        [Route("/UpdateMovies")]
        public void UpdateMovies(movies movies)
        {
            _movieService.UpdateMovie(movies);
        }

        [HttpPut]
        [Route("/UpdateActiveMovies")]
        public void UpdateMostActiveQuibs(MostActiveQuibs mostActiveQuibs)
        {
            _movieService.UpdateMostActiveQuibs(mostActiveQuibs);

        }
        [HttpPut]
        [Route("/UpdateRecentMovies")]
        public void UpdateRecentQuibs(RecentQuibs recentQuibs)
        {
            _movieService.UpdateRecentQuibs(recentQuibs);

        }
        [HttpGet]
        [Route("/MoviePosterById")]
        public List<Poster> MoviePosterById(int MovieId)
        {
         return  _movieService.GetMoviePosterById(MovieId);

        }
        [HttpGet]
        [Route("/GetMovieById")]
        public Movie GetMovieById(int MovieId) {
            return _movieService.GetMovieById(MovieId);
        }
    }
}

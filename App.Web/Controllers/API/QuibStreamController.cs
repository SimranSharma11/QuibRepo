﻿using App.Models.DataModels;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuibStreamController : ControllerBase
    {
        private readonly IMovieService _movieService;
        private readonly IAdminPanel _adminPanel;

        public QuibStreamController(IMovieService movieService,IAdminPanel adminPanel)
        {
            _movieService = movieService;
            _adminPanel = adminPanel;
        }
        [HttpGet]
        [Route("/GetQuibsById")]
        public List<App.Models.DataModels.QuibStream> GetQuibsByMovieId(int MovieId, bool QuibZero)
        {
            return _movieService.GetQuibsByMovieId(MovieId, QuibZero);
         
        }
        [HttpGet]
        [Route("GetAllQuibTime")]
        public List<time> GetAllQuibTime()
        {
           //var MovieId = HttpContext.Session.GetInt32("MovieId");
            return _movieService.GetAllQuibTime(33);
        }
        [HttpGet]
        [Route("GetMovieLength")]
        public List<Length> GetMovieLength()
        {
            //var MovieId = HttpContext.Session.GetInt32("MovieId");
            return _adminPanel.GetMovieLength(33);
        }
        [HttpGet]
        [Route("/GetQuibsByMovieIdForInterval")]
        public List<App.Models.DataModels.QuibStream> GetQuibsByMovieIdForInterval(int MovieId, bool QuibZero, string SelectedStream, int StartTime)
        {
            return _movieService.GetQuibsByMovieIdForInterval(MovieId,QuibZero,SelectedStream,StartTime);

        }
        [HttpGet]
        [Route("/GetInitialQuibsByMovieId")]
        public List<App.Models.DataModels.QuibStream> GetInitialQuibsByMovieId(int MovieId, bool QuibZero, string SelectStream)
        {
            return _movieService.GetInitialQuibsByMovieId(MovieId,QuibZero,SelectStream);

        }
    }
}

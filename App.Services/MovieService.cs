using App.Data;
using App.Models.DataModels;
using App.Models.ViewModels;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services
{
    public class MovieService : IMovieService
    {
        private readonly AppDbContext _appDbContext;
        private readonly IHostingEnvironment _hostingEnvironment;

        public MovieService(AppDbContext appDbContext, Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment)
        {
            _appDbContext = appDbContext;
            _hostingEnvironment = hostingEnvironment;
        }

        public List<MostActiveQuibs> GetALLMostActiveQuibs()
        {
            var movie = _appDbContext.MostActiveQuibs.FromSqlRaw("Call GetAllMostActiveQuibs;").ToList();
            return movie;
        }

        public List<Movie> GetALLMovie()
        {
            var movies = _appDbContext.movie.FromSqlRaw("CALL GETALLMOVIES;").ToList();

            //var movies = _appDbContext.movies.OrderBy(x => x.Title).ToList();

            return movies;
        }

        public List<RecentQuibs> GetALLRecentQuibs()
        {
            var movie = _appDbContext.recentquibs.FromSqlRaw("Call GetAllRecentQuibs;").ToList();
            return movie;
          
        }
        public void AddMostActiveQuibs(MostActiveQuibs mostActiveQuibs)
        {
            var movie = _appDbContext.MostActiveQuibs.Add(mostActiveQuibs);
        _appDbContext.SaveChanges();
          
           
        }

        public void AddMovie(movies movies)
        {
            //if(movies!= null)
            //{
            //       string uniqueFileName = null;
            //        string filePath = null;
            //        if (movies.PosterContent.Length != 0)
            //        {
            //            string uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "images/movies");

            //            uniqueFileName = Guid.NewGuid().ToString() + "_" + movies.PosterContent.FileName;
            //            filePath = Path.Combine(uploadsFolder, uniqueFileName);

            //             movies.PosterContent.CopyTo(new FileStream(filePath, FileMode.Create));
            //        movies.PosterContentThumb = filePath;
            //    }
                
                var movieobj = _appDbContext.movies.Add(movies);
            _appDbContext.SaveChanges();
            
        }

        public void AddRecentQuibs(RecentQuibs recentQuibs)
        {
            var movie = _appDbContext.recentquibs.Add(recentQuibs);
        _appDbContext.SaveChanges();

        }
        public void DeleteMostActiveQuibs(int Id)
        {
          var movie = _appDbContext.MostActiveQuibs.FirstOrDefault(x => x.Id == Id);
            if(movie!= null)
            { movie.IsActive = false;
                _appDbContext.MostActiveQuibs.Update(movie);
                _appDbContext.SaveChanges();
            }
    }

        public void DeleteMovie(int Id)
        {
            var movie = _appDbContext.movies.FirstOrDefault(x => x.Id == Id);
            if (movie != null)
            {
                movie.IsActive = false;
                _appDbContext.movies.Update(movie);
                _appDbContext.SaveChanges();
            }
        }

        public void DeleteRecentQuibs(int Id)
        {
            var movie = _appDbContext.recentquibs.FirstOrDefault(x => x.Id == Id);
            if (movie != null)
            {
                movie.IsActive = false;
                _appDbContext.recentquibs.Update(movie);
                _appDbContext.SaveChanges();
            }
        }
        public void UpdateMostActiveQuibs(MostActiveQuibs mostActiveQuibs)
        {
            var movie = _appDbContext.MostActiveQuibs.FirstOrDefault(x => x.Id == mostActiveQuibs.Id);
            if (movie != null)
            {
                movie.MovieId= mostActiveQuibs.MovieId;
                movie.Title = mostActiveQuibs.Title;
                movie.Length = mostActiveQuibs.Length;
                movie.PosterContentThumb = mostActiveQuibs.PosterContentThumb;
                movie.ReleaseYear = mostActiveQuibs.ReleaseYear;
                movie.Director = mostActiveQuibs.Director;
                movie.IsActive = mostActiveQuibs.IsActive;
                _appDbContext.MostActiveQuibs.Update(movie);
                _appDbContext.SaveChanges();
            }
        }

        public void UpdateMovie(movies movies)
        {
            var movie = _appDbContext.movies.FirstOrDefault(x => x.Id == movies.Id);
            if (movie != null)
            {
                movie.Id = movies.Id;
                movie.Title = movies.Title;
                movie.Director = movies.Director;
                movie.ReleaseYear = movies.ReleaseYear;
                movie.Length = movies.Length;
                movie.ModifiedDate = movies.ModifiedDate;
                movie.PosterContent = movies.PosterContent;
                movie.IsActive = movies.IsActive;
                movie.PosterContentThumb = movies.PosterContentThumb;
                _appDbContext.movies.Update(movie);
                _appDbContext.SaveChanges();
            }
        }

        public void UpdateRecentQuibs(RecentQuibs recentQuibs)
        {
            var movie = _appDbContext.recentquibs.FirstOrDefault(x => x.Id == recentQuibs.Id);
            if (movie != null)
            {
                movie.MovieId = recentQuibs.MovieId;
                movie.Title = recentQuibs.Title;
                movie.Length = recentQuibs.Length;
                movie.PosterContentThumb = recentQuibs.PosterContentThumb;
                movie.ReleaseYear = recentQuibs.ReleaseYear;
                movie.Director = recentQuibs.Director;
                movie.IsActive = recentQuibs.IsActive;
                _appDbContext.recentquibs.Update(movie);
                _appDbContext.SaveChanges();
            }
        }
        public List<QuibStream> GetQuibsByMovieId(int MovieId, bool QuibZero)
        {
           
            string SelectStream = "null";
          var  @p_MovieId = MovieId;
          var  @p_isQuibZero = QuibZero;
            var @p_SelectedStreams = SelectStream;

            List<QuibStream> quibStreams = new List<QuibStream>();
            if (QuibZero)
            {
            quibStreams = _appDbContext.quibStreams.FromSqlRaw("call GetQuibsByMovieId("+ @p_MovieId+","+@p_isQuibZero+","+@p_SelectedStreams+");").ToList();
            }
        else{
        quibStreams = _appDbContext.quibStreams.FromSqlRaw("call GetQuibZerosByMovieId(" + @p_MovieId + "," + @p_isQuibZero + "," + @p_SelectedStreams + ");").ToList();
            }
          return quibStreams;
        }
        public List<time> GetAllQuibTime(int MovieId)
        {
            return _appDbContext.Time.FromSqlRaw("Call GetAllQuibsTime("+MovieId+")").ToList();
        }
        public List<Poster> GetMoviePosterById(int MovieId)
        {
            var result = _appDbContext.posters.FromSqlRaw("Call GetMoviePosterById(" + MovieId + ")").ToList();
            return result;
        }

        public Movie GetMovieById(int id) {
           var movie = GetALLMovie().FirstOrDefault(x=>x.Id == id);
            return movie;
        }
        public List<QuibStream> GetQuibsByMovieIdForInterval(int MovieId, bool QuibZero,string SelectedStream,int StartTime)
        {

         
            var @p_MovieId = MovieId;
            var @p_isQuibZero = QuibZero;
            var @p_SelectedStreams = SelectedStream;
           var @p_StartTime = StartTime;
            List<QuibStream> quibStreams = new List<QuibStream>();
            if (QuibZero)
            {
                quibStreams = _appDbContext.quibStreams.FromSqlRaw("call GetQuibsByMovieIdForInterval(" + @p_MovieId + "," + @p_isQuibZero + "," + @p_SelectedStreams + "," + @p_StartTime + ");").ToList();
            }
            else
            {
                quibStreams = _appDbContext.quibStreams.FromSqlRaw("call GetQuibZerosByMovieId(" + @p_MovieId + "," + @p_isQuibZero + "," + @p_SelectedStreams + "," + @p_StartTime + ");").ToList();
            }
            return quibStreams;
        }
        public List<QuibStream> GetInitialQuibsByMovieId(int MovieId, bool QuibZero,string SelectStream)
        {

           
            var @p_MovieId = MovieId;
            var @p_isQuibZero = QuibZero;
            var @p_SelectedStreams = SelectStream;

            List<QuibStream> quibStreams = new List<QuibStream>();
            if (QuibZero)
            {
                quibStreams = _appDbContext.quibStreams.FromSqlRaw("call GetInitialQuibsByMovieId(" + @p_MovieId + "," + @p_isQuibZero + "," + @p_SelectedStreams + ");").ToList();
            }
            else
            {
                quibStreams = _appDbContext.quibStreams.FromSqlRaw("call GetInitialQuibsByMovieId(" + @p_MovieId + "," + @p_isQuibZero + "," + @p_SelectedStreams + ");").ToList();
            }
            return quibStreams;
        }
    }
}

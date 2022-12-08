using App.Models.DataModels;
using App.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
  public interface IMovieService
    {
        public List<Movie> GetALLMovie();
        public List<RecentQuibs> GetALLRecentQuibs();
        public List<MostActiveQuibs> GetALLMostActiveQuibs();
        public void AddMostActiveQuibs(MostActiveQuibs mostActiveQuibs);
        public void AddMovie(movies movies);
        public void AddRecentQuibs(RecentQuibs recentQuibs);
        public void DeleteMostActiveQuibs(int Id);
        public void DeleteMovie(int Id);
        public void DeleteRecentQuibs(int Id);
        public void UpdateMostActiveQuibs(MostActiveQuibs mostActiveQuibs);
        public void UpdateMovie(movies movies);
        public void UpdateRecentQuibs(RecentQuibs recentQuibs);
        public List<QuibStream> GetQuibsByMovieId(int MovieId, bool QuibZero);
        public List<time> GetAllQuibTime(int MovieId);
        public List<Poster> GetMoviePosterById(int MovieId);
        public Movie GetMovieById(int id);
        public List<QuibStream> GetQuibsByMovieIdForInterval(int MovieId, bool QuibZero, string SelectedStream, int StartTime);
        public List<QuibStream> GetInitialQuibsByMovieId(int MovieId, bool QuibZero, string SelectStream);
        public List<QuibStream> GetQuibByUserIdAndMovieId(int MovieId, int UserId);

    } 
}

﻿using App.Data;
using App.Models.DataModels;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services
{
    public class QuibStreamService : IQuibStreamService
    {
        private readonly AppDbContext _appDbContext;

        public QuibStreamService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public IQueryable<quibs> AddQuib(quibs quib) 
        {
            var @p_Body = quib.Body;
            var @p_UserId = quib.UserId;
            var @p_ParentId = quib.ParentId;
            var @p_Time = quib.Time;
            var @p_IsQuibZero = quib.IsQuibZero;
            var @p_MovieId = quib.MovieId;
            var @p_IsSeedQuib = quib.IsSeedQuib;
            var @p_SeedQuibType = quib.SeedQuibType;
            var p_IsScreenshot = quib.IsScreenshot;
         
           var quibS = _appDbContext.quibs.FromSqlRaw("call AddQuib('" + @p_Body + "'," + @p_UserId + "," + @p_ParentId + "," + @p_Time + "," + @p_IsQuibZero + "," + @p_MovieId + "," + @p_IsSeedQuib + ",'" + @p_SeedQuibType + "'," + p_IsScreenshot + ");");
            return quibS;
        }
        public void DeleteQuibById(int Id)
        {
            var @p_Id = Id;
            var query = "call DeleteQuibById(" + @p_Id + ")";
            var deletequib = _appDbContext.quibs.FromSqlRaw("call DeleteQuibById(" + @p_Id + ")");
        }
        
        public IQueryable<quibs> UpdateQuibPostedDate(int Id, string Body)
        { 
        var p_Id = Id;  
        var p_Body = Body;
            var updatequib = _appDbContext.quibs.FromSqlRaw("call UpdateQuibPostedDate("+ p_Id + ",'" + p_Body + "')");
            return updatequib;
        }
    }
}

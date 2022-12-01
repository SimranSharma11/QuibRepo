using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models.DataModels
{
    [Keyless]
    public class QuibStream
    {
        public QuibStream()
        {
            IsBumped = false;
           
        }
        public int Id { get; set; }
        public string Body { get; set; }
        public int? UserId { get; set; }
        public int? ParentId { get; set; }
        public int? Time { get; set; }
        public bool? IsQuibZero { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? MovieId { get; set; }
        public DateTime? PostedDate { get; set; }
        public bool? IsPosted { get; set; }
        public bool? IsEnabled { get; set; }
       
        public bool? IsBumped { get; set; } 
        public int? BumpedBy { get; set; }
        public bool IsSeedQuib { get; set; }
        public string? SeedQuibType { get; set; }
        public bool IsScreenshot { get; set; } = false;
        public string DisplayName { get; set; }
        public string? AvatarBase32ImagePath { get; set; }
    }
  
}
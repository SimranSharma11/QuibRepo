using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models.DataModels
{
    public class quibs
    {
        public quibs()
        {
            IsBumped = false;

        }
        [Key]
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
      
    
}
}

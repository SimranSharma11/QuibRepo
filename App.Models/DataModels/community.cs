using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models.DataModels
{
    public class community
    {
        public int Id { get; set; }
        public int? FollowerId { get; set; }
        public int? FolloweeId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string? newFollowerId { get; set; }
        public string? newFolloweeId { get; set; }
    }
}

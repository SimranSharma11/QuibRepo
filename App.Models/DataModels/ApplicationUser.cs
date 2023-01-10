using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Models.DataModels
{
    public class ApplicationUser : IdentityUser
    {
        public bool IsAdmin { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool? IsEnabled { get; set; }
        public string? AvatarBase32ImagePath { get; set; }
        public string? AvatarBase256ImagePath { get; set; }
        public string? About { get; set; }

    }
}

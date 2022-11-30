//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Identity;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace App.Models.DataModels
//{
//   public class users:IdentityUser
//    {
//        public int Id { get; set; }

//        [Required(ErrorMessage = "Email Required!")]
//        [EmailAddress(ErrorMessage = "Invalid Email Address!")]
//        public string Email { get; set; }

//        [Required(ErrorMessage = "Password Required!")]
//        public string Password { get; set; }

//        [Required(ErrorMessage = "Confirm Password Required!")]
//        [Compare("Password", ErrorMessage = "Password and Confirm Password do not match!")]
//        public string ConfirmPassword { get; set; }

//        [Required(ErrorMessage = "Display Name Required")]
//        //[RegularExpression(@"^[a-zA-Z][a-zA-Z0-9]*$", ErrorMessage = "Invalid Display Name. only alphanumeric values are allowed.")]
//        //[RegularExpression(@"^[a-zA-Z\s\.]+$", ErrorMessage = "Invalid Display Name. Special Characters are not allowed.")]
//        public string DisplayName { get; set; }

//        public bool IsAdmin { get; set; }

//        public string About { get; set; }

//        // Store base64 string of avatar in database
//        public string AvatarBase64 { get; set; }

//        public string AvatarBase64Thumb { get; set; }

//        // Get the data of <input type="file" ...> on post
//        [NotMapped]
//        public IFormFile File { get; set; }

//        [Required(ErrorMessage = "Must Accept Terms And Conditions")]
//        public Boolean termAgreement { get; set; }

//        [RegularExpression(@"^[a-zA-Z\s\.]+$", ErrorMessage = "Invalid First Name. Special Characters are not allowed.")]
//        public string FirstName { get; set; }

//        [RegularExpression(@"^[a-zA-Z\s\.]+$", ErrorMessage = "Invalid Last Name. Special Characters are not allowed.")]
//        public string LastName { get; set; }

//        public bool IsEnabled { get; set; }

//        //ADMIN PANEL COL
//        public DateTime CreatedDate { get; set; }

//        public int BumpCount { get; set; }

//        public int FolloweeCount { get; set; }

//        public int FollowerCount { get; set; }

//        public int UnpostedQuibsCount { get; set; }
//        //TODO Anish

//        public string AvatarBase32ImagePath { get; set; }

//        public string AvatarBase256ImagePath { get; set; }
//        public string ImageString32 { get; set; }
//        public string ImageString256 { get; set; }
//        public string ImageFileType { get; set; }
      
//        }
//}

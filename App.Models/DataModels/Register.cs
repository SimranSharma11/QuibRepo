//using Microsoft.AspNetCore.Http;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace App.Models.DataModels
//{
//    public class Register
//    {
//        //public int Id { get; set; }

//        //[Required(ErrorMessage = "Email Required!")]
//        //[EmailAddress(ErrorMessage = "Invalid Email Address!")]
//        //public string Email { get; set; }

//        //[Required]
//        //[StringLength(18, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
//        //[RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")]
//        //[DataType(DataType.Password)]
//        //[Display(Name = "Password")]
//        //public string Password { get; set; }

//        //[Required(ErrorMessage = "Confirm Password Required!")]
//        //[Compare("Password", ErrorMessage = "Password and Confirm Password do not match!")]
//        //public string ConfirmPassword { get; set; }

//        //[Required(ErrorMessage = "Display Name Required")]
//        //public string DisplayName { get; set; }

//        //[Required(ErrorMessage = "Please choose profile image")]
//        //public string ProfilePicture { get; set; }

//        //[Required(ErrorMessage = "Must Accept Terms And Conditions")]
//        //public Boolean termAgreement { get; set; }

//        [Required(ErrorMessage = "Email Required!")]
//        [EmailAddress(ErrorMessage = "Invalid Email Address!")]
//        public string Email { get; set; }

//        [Required]
//        [StringLength(18, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
//        [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")]
//        [DataType(DataType.Password)]
//        [Display(Name = "Password")]
//        public string Password { get; set; }

//        [Required(ErrorMessage = "Confirm Password Required!")]
//        [Compare("Password", ErrorMessage = "Password and Confirm Password do not match!")]
//        public string ConfirmPassword { get; set; }

//        [Required(ErrorMessage = "Display Name Required")]
//        public string DisplayName { get; set; }

//        [Required(ErrorMessage = "Please choose profile image")]
//        public string ProfilePicture { get; set; }

//        [Required(ErrorMessage = "Must Accept Terms And Conditions")]
//        public bool TermAgreement { get; set; }
//    }
//}

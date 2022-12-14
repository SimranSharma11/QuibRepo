using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers
{
    public class Community : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

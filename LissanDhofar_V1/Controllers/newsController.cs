using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LissanDhofar_V1.Controllers
{
    public class newsController : Controller
    {
        // GET: news
        public ActionResult Index()
        {
            return View();
        }
    }
}
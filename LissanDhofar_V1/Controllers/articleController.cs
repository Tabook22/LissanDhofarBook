using LissanDhofar_V1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LissanDhofar_V1.Controllers
{
    public class articleController : Controller
    {
        // GET: article
        public ActionResult Index()
        {
            return View();
        }

        //Get all articles
        public JsonResult getAllPosts()
        {
            using (DhofarDb db = new DhofarDb())
            {
                List<Post> lstPst = db.Posts.Select(x => x).ToList();
                return Json(lstPst, JsonRequestBehavior.AllowGet);
            }

        }

        //Add new article
        public JsonResult addNewArticle(Article article)
        {
            DhofarDb db = new DhofarDb();
            crtAddedArticle crtArt = new crtAddedArticle();
            artOrder artorder = new artOrder();
            string msg = string.Empty;
            if (article != null)
            {

                //article.post_adate = DateTime.Parse(DateTime.Now.ToShortTimeString());
                db.Articles.Add(article);
                db.SaveChanges();

                // return Json(new { status = "تمت عملية الإضافة بنجاح" }, JsonRequestBehavior.AllowGet);
                msg = "تمت عملية الإضافة بنجاح";

                //get the current added article, by getting the max articleid, then using that id to get the whole article
                int maxArtId = db.Articles.Max(x => x.ArticleId);
                Article getArt = db.Articles.Where(x => x.ArticleId == maxArtId).FirstOrDefault();

                //change the articles order based on the current article order
                artorder.getOrder(getArt.ArticleId,getArt.order, getArt.Location);

                return Json(msg, JsonRequestBehavior.AllowGet);
                //return "تمت عملية الإضافة";

            }
            else
            {
                msg = "حصل خطاء أثناء عملية الإضافة";
                return Json(msg, JsonRequestBehavior.AllowGet);
                // return "حصل خطاء أثنائء عملية الإضافة";
            }


        }

        //Get Post By Id
        public JsonResult getPostById(string id)
        {
            int pid = Convert.ToInt32(id);
            DhofarDb db = new DhofarDb();
            Post pst = db.Posts.Where(x => x.PostId == pid).FirstOrDefault();

            return Json(pst, JsonRequestBehavior.AllowGet);
        }

        // Add new article
        //public JsonResult AddArticle(Article article)
        //{
        //    string msg = string.Empty;
        //    if (article != null)
        //    {
        //        using (DhofarDb db = new DhofarDb())
        //        {
        //            article.SDate = DateTime.Parse(DateTime.Now.ToShortTimeString());
        //            db.Articles.Add(article);
        //            db.SaveChanges();
        //            msg = "تمت عملية الإضافة بنجاح";
                   
        //            return Json(msg, JsonRequestBehavior.AllowGet);
        //        }
        //    }
        //    msg = "حصل خطاء أثناء عملية الإضافة";
        //    return Json(msg, JsonRequestBehavior.AllowGet);
        //}
    }
}
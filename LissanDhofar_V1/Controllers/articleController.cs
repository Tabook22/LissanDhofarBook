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

        //Get all posts, which will be used inside the articles--------------------------------------------------------------
        public JsonResult getAllPosts()
        {
            using (DhofarDb db = new DhofarDb())
            {
                List<Post> lstPst = db.Posts.Select(x => x).ToList();
                return Json(lstPst, JsonRequestBehavior.AllowGet);
            }

        }

        //get all the articles-----------------------------------------------------------------------------------------------
        public JsonResult getAllArtciles()
        {
            //here we are going to merge two tables articles and posts then pass the result to a view model vmartposts
            using (DhofarDb db = new DhofarDb())
            {
                var getlst = db.Articles.
               Join(db.Posts,
               a => a.PostId, b => b.PostId,
               (a, b) => new VMArtPost
               {
                   ArticleId = a.ArticleId,
                   Location = a.Location,
                   PostId = a.PostId,
                   order = a.order,
                   post_title = b.post_title,
                   post_status = b.post_status,
                   post_adate = b.post_adate,
                   post_img = b.post_img
               }).ToList();

                return Json(getlst.OrderByDescending(x => x.ArticleId), JsonRequestBehavior.AllowGet);
            }


        }

        //Add new article-----------------------------------------------------------------------------------------------------
        public JsonResult addNewArticle(Article article)
        {
            DhofarDb db = new DhofarDb();
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
               // int maxArtId = db.Articles.Max(x => x.ArticleId);
                //int artid = article.ArticleId;
                //var maxOrder = db.Articles.Where(x=>x.Location  == article.Location).Max(x => x.order );
                //Article getArt = db.Articles.Where(x => x.ArticleId == maxArtId).FirstOrDefault();

                //change the articles order based on the current article order 
               // artorder.getOrder(getArt.ArticleId, getArt.order, getArt.Location, maxOrder);

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

        //edit article -----------------------------------------------------------------------------------------------------------
        public JsonResult editArticle(Article article)
        {
            DhofarDb db = new DhofarDb();
            artOrder artorder = new artOrder();
            string msg = string.Empty;
            if (article != null)
            {
                int aid = Convert.ToInt32(article.ArticleId);
                Article art = db.Articles.Where(x => x.ArticleId == aid).FirstOrDefault();
                art.Location = article.Location;
                art.Status = article.Status;
                art.SDate = article.SDate;
                art.EDate = article.EDate;
                art.PostId = article.PostId;
                art.order = article.order;
                //article.post_adate = DateTime.Parse(DateTime.Now.ToShortTimeString());
               // db.Articles.Add(art);
                db.SaveChanges();

                // return Json(new { status = "تمت عملية الإضافة بنجاح" }, JsonRequestBehavior.AllowGet);
                msg = "تمت عملية الإضافة بنجاح";

                //get the current updated article
               // Article getArt = db.Articles.Where(x => x.ArticleId == aid).FirstOrDefault();
                //var maxOrder = db.Articles.Where(x => x.Location == article.Location).Max(x => x.order);
                //change the articles order based on the current article order
               // artorder.getOrder(getArt.ArticleId, getArt.order, getArt.Location, maxOrder);

                return Json(msg, JsonRequestBehavior.AllowGet);
            }
            else
            {
                msg = "حصل خطاء أثناء عملية الإضافة";
                return Json(msg, JsonRequestBehavior.AllowGet);
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


        // Get Article by Id
        public JsonResult getArticleById(string id)
        {
            int aid = Convert.ToInt32(id);
            using (DhofarDb db = new DhofarDb())
            {
                var art = (from a in db.Articles
                           join b in db.Posts on a.PostId equals b.PostId
                           where a.ArticleId == aid
                           select new
                           {
                               a.ArticleId,
                               a.Location,
                               a.PostId,
                               a.order,
                               b.post_title,
                               b.post_status,
                               b.post_adate,
                               b.post_img
                           }).FirstOrDefault();
                //Article art = db.Articles.Where(x => x.ArticleId == aid).FirstOrDefault();

                return Json(art, JsonRequestBehavior.AllowGet);
            }
        }

        // Delete article
        public JsonResult delArticle(string id)
        {
            string msg = string.Empty;
            int aid = Convert.ToInt32(id);
            using(DhofarDb db=new DhofarDb())
            {
                Article art = db.Articles.Where(x => x.ArticleId == aid).FirstOrDefault();
                db.Articles.Remove(art);
                db.SaveChanges();

                msg = "لقد تم حذف المفالة بنجاح";
                return Json(msg, JsonRequestBehavior.AllowGet);
            }
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
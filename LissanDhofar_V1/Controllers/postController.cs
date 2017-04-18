using LissanDhofar_V1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LissanDhofar_V1.Controllers
{
    public class postController : Controller
    {
        //post page
        public ActionResult postLst()
        {
            return View();
        }
        // GET: post
        [HttpGet]
        public JsonResult getPostsLst()
        {
            DhofarDb db = new DhofarDb();
            List<Post> lst = db.Posts.Select(x=>x).ToList();
            int totalPosts = lst.Count();
            return Json(new {pstLst=lst,totalPst=totalPosts }, JsonRequestBehavior.AllowGet);
        }

        //Adding post data
   
        public JsonResult addNewPost(Post post)
        {
            string msg = string.Empty;
            if (post != null)
            {
                
                using (DhofarDb Obj = new DhofarDb())
                {
                    
                    post.post_adate = DateTime.Parse(DateTime.Now.ToShortTimeString());
                    Obj.Posts.Add(post);
                    Obj.SaveChanges();

                    // return Json(new { status = "تمت عملية الإضافة بنجاح" }, JsonRequestBehavior.AllowGet);
                    msg = "تمت عملية الإضافة بنجاح";
                    return Json(msg , JsonRequestBehavior.AllowGet);
                    //return "تمت عملية الإضافة";
                }
            }
            else
            {
                msg= "حصل خطاء أثناء عملية الإضافة";
                return Json(msg,JsonRequestBehavior.AllowGet);
               // return "حصل خطاء أثنائء عملية الإضافة";
            }
        }

        //Get Post By Id
        public JsonResult getPostById(string id)
        {
            int pid = Convert.ToInt32(id);
            DhofarDb db = new DhofarDb();
            Post pst = db.Posts.Where(x => x.PostId ==pid).FirstOrDefault();
            return Json(pst, JsonRequestBehavior.AllowGet);
        }

        //Update post
        public JsonResult updatePost(Post post)
        {
            if (post != null)
            {
                using (DhofarDb db = new DhofarDb())
                {
                    int no = Convert.ToInt32(post.PostId);
                    var postList = db.Posts.Where(x => x.PostId == no).FirstOrDefault();
                    postList.post_title = post.post_title;
                    postList.post_data = post.post_data;
                    postList.post_img = post.post_img;
                    postList.post_img_title = post.post_img_title;
                    postList.post_status = post.post_status;
                    db.SaveChanges();
                    string msg = "حتمت عملية الإضافة";
                    return Json(msg, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                string msg = "حدثت مشكلة في تعديل البيانات";
                return Json(msg,JsonRequestBehavior.AllowGet);
            }
        }

        //Delete Posts
        public JsonResult delPost(string id)
        {
            DhofarDb db = new DhofarDb();
            int getId = Convert.ToInt32(id);
            Post pst = db.Posts.Where(p => p.PostId == getId).FirstOrDefault();
            db.Posts.Remove(pst);
            db.SaveChanges();
            string msg = "تم حذف المقال بنجاح";
            return Json(msg, JsonRequestBehavior.AllowGet);
        }
    }
}
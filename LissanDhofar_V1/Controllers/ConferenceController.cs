using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LissanDhofar_V1.Models;

namespace LissanDhofar_V1.Controllers
{
    public class ConferenceController : Controller
    {
        // GET: Conference
        public ActionResult Index()
        {
            return View();
        }
        //Get conference to display on the front page
        public JsonResult getConHome()
        {
            using (DhofarDb db = new DhofarDb())
            {
                var getCon = db.Conferences.Where(x => x.cstatus == "0").ToList();
                return Json(getCon, JsonRequestBehavior.AllowGet);
            }
        }

        //get All conferences

        public JsonResult getAllcnf()
        {
            using (DhofarDb db = new DhofarDb())
            {
                List<Conference> lstCon = db.Conferences.Select(x => x).ToList();
                int totalCon = lstCon.Count();
                return Json(new { cnfLst = lstCon, totalcn = totalCon }, JsonRequestBehavior.AllowGet);
                //return Json(lstCon, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult getAllcfr()
        {
            using (DhofarDb db = new DhofarDb())
            {
                List<Conference> lstCon = db.Conferences.Select(x => x).ToList();
                int totalCon = lstCon.Count();
                return Json(new { cnfLst = lstCon, totalcn = totalCon }, JsonRequestBehavior.AllowGet);
                //return Json(lstCon, JsonRequestBehavior.AllowGet);
            }
        }

        //add new conference
        [HttpPost]
        public JsonResult addNewConf(Conference conf)
        {
            string msg = string.Empty;
            if (conf != null)
            {

                using (DhofarDb Obj = new DhofarDb())
                {

                    conf.cdate = DateTime.Parse(DateTime.Now.ToShortTimeString());
                    Obj.Conferences.Add(conf);
                    Obj.SaveChanges();

                    // return Json(new { status = "تمت عملية الإضافة بنجاح" }, JsonRequestBehavior.AllowGet);
                    msg = "تمت عملية الإضافة بنجاح";
                    return Json(msg, JsonRequestBehavior.AllowGet);
                    //return "تمت عملية الإضافة";
                }
            }
            else
            {
                msg = "حصل خطاء أثناء عملية الإضافة";
                return Json(msg, JsonRequestBehavior.AllowGet);
                // return "حصل خطاء أثنائء عملية الإضافة";
            }
        }

        //Get Con By Id
        public JsonResult getConById(string id)
        {
            int pid = Convert.ToInt32(id);
            DhofarDb db = new DhofarDb();
            Conference  con = db.Conferences.Where(x => x.confId  == pid).FirstOrDefault();
            return Json(con, JsonRequestBehavior.AllowGet);
        }

        // get conference details which will be in the home page so the visitors can see
        public JsonResult getConfInfo(string confId)
        {
            int pid = Convert.ToInt32(confId);
            DhofarDb db = new DhofarDb();
            Conference con = db.Conferences.Where(x => x.confId == pid).FirstOrDefault();
            return Json(con, JsonRequestBehavior.AllowGet);
        }

        // get conference details which will be in the home page so the visitors can see
        public JsonResult getConfInfoEn(string confId)
        {
            int pid = Convert.ToInt32(confId);
            DhofarDb db = new DhofarDb();
            Conference con = db.Conferences.Where(x => x.confId == pid && x.clang =="1").FirstOrDefault();
            return Json(con, JsonRequestBehavior.AllowGet);
        }

        //Update conference
        public JsonResult updateCon(Conference  conf)
        {
            if (conf != null)
            {
                using (DhofarDb db = new DhofarDb())
                {
                    int no = Convert.ToInt32(conf.confId);
                    var conList = db.Conferences .Where(x => x.confId == no).FirstOrDefault();
                    conList.cTitle = conf.cTitle;
                    conList.cdetails= conf.cdetails;
                    conList.cmessage = conf.cmessage;
                    conList.corgnizer = conf.corgnizer;
                    conList.cguidelines = conf.cguidelines;
                    conList.cvision  = conf.cvision;
                    conList.cfacilities = conf.cfacilities;
                    conList.cimg = conf.cimg;
                    conList.cfile = conf.cfile;
                    conList.crfile = conf.crfile;
                    conList.cfileEn = conf.cfileEn;
                    conList.crfileEn = conf.crfileEn;
                    conList.cstatus = conf.cstatus;
                    conList.clang = conf.clang;
                    conList.ftype = conf.ftype;
                    db.SaveChanges();
                    string msg = "تمت عملية الإضافة";
                    return Json(msg, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                string msg = "حدثت مشكلة في تعديل البيانات";
                return Json(msg, JsonRequestBehavior.AllowGet);
            }
        }


        //Delete Conference
        public JsonResult delCon(string id)
        {
            DhofarDb db = new DhofarDb();
            int getId = Convert.ToInt32(id);
            Conference conf= db.Conferences.Where(p => p.confId == getId).FirstOrDefault();
            db.Conferences.Remove(conf);
            db.SaveChanges();
            string msg = "تم حذف المؤتمر بنجاح";
            return Json(msg, JsonRequestBehavior.AllowGet);
        }
    }
}
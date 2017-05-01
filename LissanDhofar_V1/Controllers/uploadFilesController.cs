using LissanDhofar_V1.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LissanDhofar_V1.Controllers
{
    public class uploadFilesController : Controller
    {
        // GET: uploadFiles
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ngUploadImg()
        {
            return View();
        }

        public ActionResult uploadImg()
        {
            return View();
        }

        public ActionResult uploadMyFiles()
        {
            return View();
        }


        //get all images
        public JsonResult getAllImg()
        {
            using (DhofarDb db = new DhofarDb())
            {
                List<UploadedFile> uf = db.UploadedFiles.Select(x=>x).ToList();
                return Json(uf, JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult SaveUploadedFile()
        {
            bool isSavedSuccessfully = true;
            string msg = string.Empty;
            string fName = "";
            try
            {
                foreach (string fileName in Request.Files)
                {
                    HttpPostedFileBase file = Request.Files[fileName];
                    fName = file.FileName;
                    if (file != null && file.ContentLength > 0)
                    {
                        int size = file.ContentLength;

                        var path = Path.Combine(Server.MapPath("~/UploadedFiles"));
                        string pathString = System.IO.Path.Combine(path.ToString());
                        //var fileName1 = Path.GetFileName(file.FileName);
                        var fileName1 =Guid.NewGuid() + Path.GetExtension(file.FileName);
                        bool isExists = System.IO.Directory.Exists(pathString);
                        if (!isExists) System.IO.Directory.CreateDirectory(pathString);
                        var uploadpath = string.Format("{0}\\{1}", pathString, fileName1);
                        file.SaveAs(uploadpath);
                        using (DhofarDb db = new DhofarDb())
                        {
                            UploadedFile uf = new UploadedFile();
                            uf.FileName = fileName1;
                            uf.FileSize = size;
                            db.UploadedFiles.Add(uf);
                            db.SaveChanges();

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                isSavedSuccessfully = false;
            }
            if (isSavedSuccessfully)
            {
                msg = "تم رفعل الصورة بنجاح";
                return Json(msg, JsonRequestBehavior.AllowGet);
            }
            else
            {
                msg = "حصل خطاء أثناء رفع الصورة";
                return Json(msg, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public JsonResult SaveFiles(string description)
        {
            string Message, fileName, actualFileName;
            Message = fileName = actualFileName = string.Empty;
            bool flag = false;
            if (Request.Files != null)
            {
                var file = Request.Files[0];
                actualFileName = file.FileName;
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                int size = file.ContentLength;

                try
                {
                    file.SaveAs(Path.Combine(Server.MapPath("~/UploadedFiles"), fileName));

                    UploadedFile f = new UploadedFile
                    {
                        FileName = actualFileName,
                        FilePath = fileName,
                        Description = description,
                        FileSize = size
                    };
                    using (DhofarDb dc = new DhofarDb())
                    {
                        dc.UploadedFiles.Add(f);
                        dc.SaveChanges();
                        Message = "File uploaded successfully";
                        flag = true;
                    }
                }
                catch (Exception)
                {
                    Message = "File upload failed! Please try again";
                }

            }
            return new JsonResult { Data = new { Message = Message, Status = flag } };
        }

        //Delete Images
        public JsonResult delImgs(string id)
        {
           int imgId = Convert.ToInt32(id);
            string msg = string.Empty;
            using(DhofarDb db=new DhofarDb())
            {
                UploadedFile up = db.UploadedFiles.Where(x => x.FileId == imgId).FirstOrDefault();
                string file_name= up.FileName;
                db.UploadedFiles.Remove(up);
                db.SaveChanges();

                //delete image from uploadfiles folder
                string path = Server.MapPath("~/UploadedFiles/"+ file_name);
                FileInfo file = new FileInfo(path);
                if (file.Exists)//check file exsit or not
                {
                    file.Delete();
      
                }
                else
                {
                   
                }

                msg = " تم حذف الصورة بنجاح";
                return Json(msg, JsonRequestBehavior.AllowGet);
            }

        }
    }
}
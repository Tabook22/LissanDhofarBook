using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LissanDhofar_V1.Models;
namespace LissanDhofar_V1.Controllers
{
    public class ContactsController : Controller
    {

        public JsonResult addContacts(contact contact)
        {

            using (DhofarDb db = new DhofarDb())
            {
                contact.cdate = DateTime.Parse(DateTime.Now.ToShortTimeString());
                contact.cstatus = "0";
                db.contacts.Add(contact);
                db.SaveChanges();
                var msg = "تم إضافة جهة الإتصال";
                return Json(msg, JsonRequestBehavior.AllowGet);
            }

        }
    }
}
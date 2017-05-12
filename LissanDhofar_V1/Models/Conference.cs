using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LissanDhofar_V1.Models
{
	public class Conference
	{
        [Key]
        public int confId { get; set; }
        public DateTime cdate { get; set; }
        [Display(Name = "عنوان المؤتمر")]
        public string cTitle { get; set; }
        [Display(Name ="المقدمة")]
        public string cdetails { get; set; }
        [Display(Name = "رسالة المؤتمر")]
        public string cmessage { get; set; }
        [Display(Name = "رؤية المؤتمر")]
        public string cvision { get; set; }
        [Display(Name = "التسهيلات")]
        public string cfacilities { get; set; }
        [Display(Name = "متطلبات المشاركة")]
        public string crequirements { get; set; }
        [Display(Name = "الجهة المنظمة")]
        public string corgnizer { get; set; }
        [Display(Name = "محاور المؤتمر")]
        public string cguidelines { get; set; }
        [Display(Name = "التسجيل")]
        public int cregId { get; set; }
        [Display(Name = "معلومات المؤتمر")]
        public int cinfoId { get; set; }
        [Display(Name = "اللغه")]
        public string clang { get; set; }
        [Display(Name = "الحالة")]
        public string cstatus { get; set; }
        public string cimg { get; set; }
    }
}
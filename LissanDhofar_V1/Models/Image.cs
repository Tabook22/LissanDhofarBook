using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LissanDhofar_V1.Models
{
    public class Image
    {
        [Key]
        public int imgid { get; set; }
        [Display(Name = "موقع الصورة")]
        public string imgfolder { get; set; }
        public string imgurl_lg { get; set; }
        public string imgurl_sm { get; set; }
        public string imgurl_th { get; set; }
        public string imgfullurl { get; set; }
        [Display(Name = "عنوان الصورة")]
        public string imgtitle { get; set; }
        [Display(Name = "وصف الصورة")]
        public string imgdesc { get; set; }
        [Display(Name = "رابط الصورة الصورة")]
        public string imglink { get; set; }
        public DateTime adate { get; set; }
        [Display(Name = "حالة الصورة")]
        public int status { get; set; }
        [Display(Name = "عرض الصورة")]
        public string imgw { get; set; }
        [Display(Name = "إرتفاع الصورة")]
        public string imgh { get; set; }
    }
}
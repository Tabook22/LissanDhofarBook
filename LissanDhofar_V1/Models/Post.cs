using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LissanDhofar_V1.Models
{
    public class Post
    {
        public Post()
        {

        }

        [Key]
        public int PostId { get; set; }
        [Required(ErrorMessage ="الرجاء كتابة عنوان المقالة")]
        [Display(Name ="عنوان المقالة")]
        public string post_title { get; set; }
        public int post_status{ get; set; }
        [DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = false)]
        public DateTime post_adate { get; set; }
        [Display(Name ="المؤلف")]
        public string post_author { get; set; }
        [Display(Name ="البيانات")]
        [UIHint("tinymce_Jquery_Full"), AllowHtml]
        public string post_data { get; set; }
        [Display(Name = "ملخص المقالة")]
        public string post_excerpt { get; set; }
        [Display(Name = "صورة المقالة الرئيسية")]
        public string post_img { get; set; }
        [Display(Name = "عنوان الصورة")]
        public string post_img_title { get; set; }
        //Articles id 
       // public int ArticleId { get; set; }

        //public Article Articles { get; set; }
    }
}
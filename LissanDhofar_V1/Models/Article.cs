using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LissanDhofar_V1.Models
{
    public class Article
    {
        public Article()
        {
            SDate = DateTime.Now; // to fill the SDate with the default date

            //In order to avoid potential null reference exception possibility, we want to create a new instance of 
            //collection when a Article object is created.We will use HashSet of the T collection type, as shown in the 
            //following code:
           // Posts = new HashSet<Post>(); //here we put the Posts property in the constructor to inizlize it before start to use it the idea is to prevents null reference exceptions (using the property when it null)
        }

        [Key]
        public int ArticleId { get; set; }
        [Display(Name ="الموقع")]
        public string Location { get; set; }
        [Display(Name ="الحالة")]
        public string Status { get; set; }
        [Display(Name ="تاريخ البداية")]
        public DateTime SDate { get; set; }
        [Display(Name ="تاريخ النهاية")]
        public DateTime? EDate { get; set; }
        public int PostId { get; set; }
        public int order { get; set; }
        //Collection navigation property
        //Notice: we used the key word virtual, to say that we need the EF to find or to get the collection for us from the database, this is called lazy loading
        //public virtual ICollection<Post> Posts{ get; set; }
    }
}
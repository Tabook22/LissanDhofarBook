using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LissanDhofar_V1.Models
{
    public class VMArtPost
    {
        public int ArticleId { get; set; }
        public string Location { get; set; }
        public int PostId { get; set; }
        public int order { get; set; }
        public string post_title { get; set; }
        public int post_status { get; set; }
        public DateTime post_adate { get; set; }
        public string post_img { get; set; }
    }
}
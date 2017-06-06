using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LissanDhofar_V1.Models
{
    public class confile
    {
        [Key]
        public int fId { get; set; }
        public string filename { set; get; }
        public string filedesc { set; get; }
        public DateTime fdate { set; get; }
    }
}
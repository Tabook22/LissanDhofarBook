using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LissanDhofar_V1.Models
{
	public class conInfo
	{
        [Key]
        public int cinfoId { get; set; }
        [Display(Name = "مواعيد هامة")]
        public string impdate { get; set; }
        [Display(Name = "جلسات الندوة")]
        public string csession { get; set; }
        [Display(Name = "المراسلات")]
        public string ccon { get; set; }
        [Display(Name = "دعوة")]
        public string cfile { get; set; }
    }
}
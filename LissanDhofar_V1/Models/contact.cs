using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LissanDhofar_V1.Models
{
    public class contact
    {
        [Key]
        public int CID { get; set; }
        public DateTime cdate { get; set; }
        public string cname { get; set; }
        public string cemail { get; set; }
        public string cmsg { get; set; }
        public string cstatus { get; set; }
    }
}
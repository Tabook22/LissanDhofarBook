using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LissanDhofar_V1.Models
{
    public class ConfVideo
    {
        [Key]
        public int vId { get; set; }
        public string vTitle { get; set; }
        public string vUrl { get; set; }
        public string vDesc { get; set; }
        public DateTime vDate { get; set; }
        public string vStatus { get; set; }
    }
}
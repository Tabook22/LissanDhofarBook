using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LissanDhofar_V1.Models
{
    public class UploadedFile
    {
        [Key]
        public int FileId { get; set; }
        public string FileName { get; set; }
        public string Description { get; set; }
        public string FilePath { get; set; }
        public int FileSize { get; set; }
    }
}
using System;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LissanDhofar_V1.Models
{
    public class DhofarDb:DbContext
    {
        public DhofarDb ():base("name=myConnection")
        {

        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Article>Articles { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<UploadedFile> UploadedFiles { get; set; }
    }
}
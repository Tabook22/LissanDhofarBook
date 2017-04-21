namespace LissanDhofar_V1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class firstChange : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Articles",
                c => new
                    {
                        ArticleId = c.Int(nullable: false, identity: true),
                        Location = c.String(),
                        Status = c.String(),
                        SDate = c.DateTime(nullable: false),
                        EDate = c.DateTime(),
                        PostId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ArticleId);
            
            CreateTable(
                "dbo.Images",
                c => new
                    {
                        imgid = c.Int(nullable: false, identity: true),
                        imgfolder = c.String(),
                        imgurl_lg = c.String(),
                        imgurl_sm = c.String(),
                        imgurl_th = c.String(),
                        imgfullurl = c.String(),
                        imgtitle = c.String(),
                        imgdesc = c.String(),
                        imglink = c.String(),
                        adate = c.DateTime(nullable: false),
                        status = c.Int(nullable: false),
                        imgw = c.String(),
                        imgh = c.String(),
                    })
                .PrimaryKey(t => t.imgid);
            
            CreateTable(
                "dbo.Posts",
                c => new
                    {
                        PostId = c.Int(nullable: false, identity: true),
                        post_title = c.String(nullable: false),
                        post_status = c.Int(nullable: false),
                        post_adate = c.DateTime(nullable: false),
                        post_author = c.String(),
                        post_data = c.String(),
                        post_excerpt = c.String(),
                        post_img = c.String(),
                        post_img_title = c.String(),
                    })
                .PrimaryKey(t => t.PostId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Posts");
            DropTable("dbo.Images");
            DropTable("dbo.Articles");
        }
    }
}

namespace LissanDhofar_V1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class firstChanges : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Posts", "ArticleId", "dbo.Articles");
            DropIndex("dbo.Posts", new[] { "ArticleId" });
            DropColumn("dbo.Posts", "ArticleId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Posts", "ArticleId", c => c.Int(nullable: false));
            CreateIndex("dbo.Posts", "ArticleId");
            AddForeignKey("dbo.Posts", "ArticleId", "dbo.Articles", "ArticleId", cascadeDelete: true);
        }
    }
}

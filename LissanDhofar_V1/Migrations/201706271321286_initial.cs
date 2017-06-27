namespace LissanDhofar_V1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ConfVideos",
                c => new
                    {
                        vId = c.Int(nullable: false, identity: true),
                        vTitle = c.String(),
                        vUrl = c.String(),
                        vDesc = c.String(),
                        vDate = c.DateTime(nullable: false),
                        vStatus = c.String(),
                    })
                .PrimaryKey(t => t.vId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ConfVideos");
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LissanDhofar_V1.Models
{
    public class artOrder
    {
        //this void we get all the articles who have order greater or less that the order of our current article and then add 1 or subtract 1 from the order of the other articles
        public void getOrder(int artId, int artOrder, string location, int maxOrder)
        {
            DhofarDb db = new DhofarDb();
            Article art = new Article();
            //TODO: check to see if the article exisits
            //int isArtEx = db.Articles.Where(x => x.ArticleId == artId).Count();
            //this is in the case of adding new article
            //if (isArtEx > 0)
            //if (flag==1)
            //{
            //TODO:get the current article which we added, and have a new order
            // art = db.Articles.Where(x => x.ArticleId == artId).FirstOrDefault();
            //if (artOrder - art.order >= 0)
            //{
            //here we are searching for a list of articles which has order equal or greater than the order value store in the article we just entered, and those article must be from the same group or location
            // then we are going to add 1 to the order of these articles
            foreach (var itm in db.Articles.Where(x => x.order == artOrder || x.order > artOrder && x.Location == location).ToList())
            {
                if (itm.ArticleId != artId)
                {
                    for (int i = artOrder; i < maxOrder; i++)
                    {
                        itm.order = i;
                        db.SaveChanges();
                    }

                }
            }
            //db.SaveChanges();
            //}
            //}
            //this is in the case of update
            //else if(isArtEx <0)
            //   else if (flag ==0)
            //{
            //TODO:get the current article which we changed its order
            //    art = db.Articles.Where(x => x.ArticleId == artId).FirstOrDefault();
            //    if (artOrder - art.order >= 0)
            //    {

            //        foreach (var itm in db.Articles.Where(x => x.order !=1 || x.order < artOrder && x.Location == location).ToList())
            //        {
            //            if (itm.ArticleId != artId)
            //            {
            //                itm.order = itm.order - 1;
            //            }


            //        }
            //        db.SaveChanges();
            //    }
            //}
        }
    }
}
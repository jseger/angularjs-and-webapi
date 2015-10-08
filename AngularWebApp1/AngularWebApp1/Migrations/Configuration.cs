namespace AngularWebApp1.Migrations
{
    using AngularWebApp1.Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<AngularWebApp1.Entities.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            // we can create some dummy products
            context.Products.AddOrUpdate(x => x.Title,
                new Product()
                {
                    Title = "Shirt",
                    Price = 45.78
                });
            context.Products.AddOrUpdate(x => x.Title,
                new Product()
                {
                    Title = "Pants",
                    Price = 88.32
                });
            context.Products.AddOrUpdate(x => x.Title,
                new Product()
                {
                    Title = "Shoes",
                    Price = 69.75
                });
             context.Products.AddOrUpdate(x => x.Title,
                new Product()
                {
                    Title = "Belt",
                    Price = 22.55
                });
        }
    }
}

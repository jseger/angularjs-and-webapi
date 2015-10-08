using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using AngularWebApp1.Models;
using AngularWebApp1.Entities;

namespace AngularWebApp1.Controllers
{
    public class ProductsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Products
        public IQueryable<ProductViewModel> GetProducts()
        {
            var products = from p in db.Products
                           where p.Deleted == false
                           select new ProductViewModel()
                           {
                               Id = p.Id.ToString(),
                               Title = p.Title,
                               Price = p.Price
                           };

            return products;
        }

        // GET: api/Products/5
        [ResponseType(typeof(ProductViewModel))]
        public async Task<IHttpActionResult> GetProduct(Guid id)
        {
            var product = await db.Products.Select(p => 
                new ProductViewModel()
                {
                    Id = p.Id.ToString(),
                    Title = p.Title,
                    Price = p.Price
                }).SingleOrDefaultAsync(p => p.Id == id.ToString());

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [Authorize]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProduct(Guid id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.Id)
            {
                return BadRequest();
            }

            product.DateModified = DateTime.Now;

            db.Entry(product).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Products
        [Authorize]
        [ResponseType(typeof(ProductViewModel))]
        public async Task<IHttpActionResult> PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            product.DateCreated = DateTime.Now;
            product.DateModified = DateTime.Now;

            db.Products.Add(product);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = product.Id }, 
                new ProductViewModel()
                {
                    Id = product.Id.ToString(),
                    Title = product.Title,
                    Price = product.Price
                });
        }

        // DELETE: api/Products/5
        [Authorize]
        [ResponseType(typeof(ProductViewModel))]
        public async Task<IHttpActionResult> DeleteProduct(Guid id)
        {
            Product product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            //db.Products.Remove(product);
            product.DateDeleted = DateTime.Now;
            product.Deleted = true;
            await db.SaveChangesAsync();

            return Ok(new ProductViewModel()
            {
                Id = product.Id.ToString(),
                Title = product.Title,
                Price = product.Price
            });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(Guid id)
        {
            return db.Products.Count(e => e.Id == id) > 0;
        }
    }
}
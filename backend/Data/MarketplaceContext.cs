using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class MarketplaceContext : DbContext
    {
        public MarketplaceContext(DbContextOptions<MarketplaceContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Cart>()
                .HasMany(c => c.Items)
                .WithOne(ci => ci.Cart)
                .HasForeignKey(ci => ci.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Product)
                .WithMany()
                .HasForeignKey(ci => ci.ProductId);

            modelBuilder.Entity<Cart>()
                .HasIndex(c => c.UserId)
                .IsUnique();

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Title = "OSU Scarlet Hoodie - Size L", Description = "Comfortable Ohio State scarlet hoodie with a classic Block O design. Great for campus wear, game days, and everyday style.", Price = 42.00m, Category = "Apparel", SellerName = "Buckeye Marketplace", PostedDate = new DateTime(2025, 3, 1), ImageUrl = "https://picsum.photos/seed/1/200" },
                new Product { Id = 2, Title = "Gray Buckeyes Baseball Cap", Description = "Adjustable gray baseball cap with embroidered Buckeyes logo. A simple and versatile fan essential.", Price = 24.00m, Category = "Fan Gear", SellerName = "Buckeye Marketplace", PostedDate = new DateTime(2025, 3, 2), ImageUrl = "https://picsum.photos/seed/2/200" },
                new Product { Id = 3, Title = "OSU Ceramic Mug Gift Set", Description = "A gift-ready mug set featuring Ohio State themed graphics. Ideal for alumni, parents, or holiday presents.", Price = 28.00m, Category = "Gifts", SellerName = "Buckeye Marketplace", PostedDate = new DateTime(2025, 3, 3), ImageUrl = "https://picsum.photos/seed/3/200" },
                new Product { Id = 4, Title = "Ohio State Diploma Frame - Cherry Wood", Description = "Premium cherry wood diploma frame with an elegant Ohio State design. A polished keepsake for graduates and families.", Price = 120.00m, Category = "Premium Gifts", SellerName = "Buckeye Marketplace", PostedDate = new DateTime(2025, 3, 4), ImageUrl = "https://picsum.photos/seed/4/200" },
                new Product { Id = 5, Title = "Wireless Earbuds for Study and Travel", Description = "Compact wireless earbuds with charging case, ideal for commuting, studying, and everyday use on campus.", Price = 39.00m, Category = "Electronics", SellerName = "Campus Tech Store", PostedDate = new DateTime(2025, 3, 5), ImageUrl = "https://picsum.photos/seed/5/200" },
                new Product { Id = 6, Title = "Block O Laptop Sleeve", Description = "Protective laptop sleeve with a clean Ohio State inspired design. Fits most 13-inch laptops and tablets.", Price = 26.00m, Category = "Accessories", SellerName = "Buckeye Marketplace", PostedDate = new DateTime(2025, 3, 6), ImageUrl = "https://picsum.photos/seed/6/200" },
                new Product { Id = 7, Title = "Buckeye Game Day Scarf", Description = "Soft scarlet and gray scarf made for chilly game days, tailgates, and fall campus events.", Price = 19.00m, Category = "Fan Gear", SellerName = "Buckeye Marketplace", PostedDate = new DateTime(2025, 3, 7), ImageUrl = "https://picsum.photos/seed/7/200" },
                new Product { Id = 8, Title = "Buckeye Alumni Premium Gift Box", Description = "Curated alumni gift box including a journal, tumbler, and Ohio State themed accessories. Designed for premium gifting.", Price = 85.00m, Category = "Premium Gifts", SellerName = "Buckeye Marketplace", PostedDate = new DateTime(2025, 3, 8), ImageUrl = "https://picsum.photos/seed/8/200" }
            );
        }
    }
}
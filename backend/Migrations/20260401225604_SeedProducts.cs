using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "Description", "ImageUrl", "PostedDate", "Price", "SellerName", "Title" },
                values: new object[,]
                {
                    { 1, "Apparel", "Comfortable Ohio State scarlet hoodie with a classic Block O design. Great for campus wear, game days, and everyday style.", "https://picsum.photos/seed/1/200", new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 42.00m, "Buckeye Marketplace", "OSU Scarlet Hoodie - Size L" },
                    { 2, "Fan Gear", "Adjustable gray baseball cap with embroidered Buckeyes logo. A simple and versatile fan essential.", "https://picsum.photos/seed/2/200", new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 24.00m, "Buckeye Marketplace", "Gray Buckeyes Baseball Cap" },
                    { 3, "Gifts", "A gift-ready mug set featuring Ohio State themed graphics. Ideal for alumni, parents, or holiday presents.", "https://picsum.photos/seed/3/200", new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 28.00m, "Buckeye Marketplace", "OSU Ceramic Mug Gift Set" },
                    { 4, "Premium Gifts", "Premium cherry wood diploma frame with an elegant Ohio State design. A polished keepsake for graduates and families.", "https://picsum.photos/seed/4/200", new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 120.00m, "Buckeye Marketplace", "Ohio State Diploma Frame - Cherry Wood" },
                    { 5, "Electronics", "Compact wireless earbuds with charging case, ideal for commuting, studying, and everyday use on campus.", "https://picsum.photos/seed/5/200", new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 39.00m, "Campus Tech Store", "Wireless Earbuds for Study and Travel" },
                    { 6, "Accessories", "Protective laptop sleeve with a clean Ohio State inspired design. Fits most 13-inch laptops and tablets.", "https://picsum.photos/seed/6/200", new DateTime(2025, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 26.00m, "Buckeye Marketplace", "Block O Laptop Sleeve" },
                    { 7, "Fan Gear", "Soft scarlet and gray scarf made for chilly game days, tailgates, and fall campus events.", "https://picsum.photos/seed/7/200", new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 19.00m, "Buckeye Marketplace", "Buckeye Game Day Scarf" },
                    { 8, "Premium Gifts", "Curated alumni gift box including a journal, tumbler, and Ohio State themed accessories. Designed for premium gifting.", "https://picsum.photos/seed/8/200", new DateTime(2025, 3, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 85.00m, "Buckeye Marketplace", "Buckeye Alumni Premium Gift Box" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);
        }
    }
}

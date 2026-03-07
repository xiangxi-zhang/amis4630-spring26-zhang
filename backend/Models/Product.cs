namespace backend.Models;

/// <summary>
/// Represents a product listing on Buckeye Marketplace.
/// Each field maps directly to the JSON returned by the API.
/// </summary>
public class Product
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string SellerName { get; set; } = string.Empty;
    public DateTime PostedDate { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}
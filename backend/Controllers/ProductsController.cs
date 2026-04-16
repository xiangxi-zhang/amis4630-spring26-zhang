using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly MarketplaceContext _context;

    public ProductsController(MarketplaceContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll()
    {
        var products = await _context.Products
            .OrderBy(p => p.Id)
            .ToListAsync();

        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            return NotFound(new { message = $"Product with id {id} was not found." });
        }

        return Ok(product);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Product>> Create(Product product)
    {
        if (string.IsNullOrWhiteSpace(product.Title))
        {
            return BadRequest(new { message = "Title is required." });
        }

        if (product.Price < 0)
        {
            return BadRequest(new { message = "Price cannot be negative." });
        }

        product.Id = 0;

        if (product.PostedDate == default)
        {
            product.PostedDate = DateTime.UtcNow;
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Product>> Update(int id, Product updatedProduct)
    {
        var existingProduct = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (existingProduct == null)
        {
            return NotFound(new { message = $"Product with id {id} was not found." });
        }

        if (string.IsNullOrWhiteSpace(updatedProduct.Title))
        {
            return BadRequest(new { message = "Title is required." });
        }

        if (updatedProduct.Price < 0)
        {
            return BadRequest(new { message = "Price cannot be negative." });
        }

        existingProduct.Title = updatedProduct.Title;
        existingProduct.Description = updatedProduct.Description;
        existingProduct.Price = updatedProduct.Price;
        existingProduct.Category = updatedProduct.Category;
        existingProduct.SellerName = updatedProduct.SellerName;
        existingProduct.ImageUrl = updatedProduct.ImageUrl;

        if (updatedProduct.PostedDate != default)
        {
            existingProduct.PostedDate = updatedProduct.PostedDate;
        }

        await _context.SaveChangesAsync();

        return Ok(existingProduct);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            return NotFound(new { message = $"Product with id {id} was not found." });
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
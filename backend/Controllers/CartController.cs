using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTOs;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly MarketplaceContext _context;
    private const string DemoUserId = "demo-user-1";

    public CartController(MarketplaceContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<CartResponse>> GetCart()
    {
        var cart = await GetOrCreateCartAsync();
        return Ok(MapCartResponse(cart));
    }

    [HttpPost]
    public async Task<ActionResult<CartResponse>> AddToCart(AddCartItemRequest request)
    {
        var product = await _context.Products.FindAsync(request.ProductId);
        if (product == null)
        {
            return NotFound(new { message = $"Product with id {request.ProductId} was not found." });
        }

        var cart = await GetOrCreateCartAsync();

        var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == request.ProductId);
        if (existingItem != null)
        {
            existingItem.Quantity += request.Quantity;
        }
        else
        {
            cart.Items.Add(new CartItem
            {
                ProductId = request.ProductId,
                Quantity = request.Quantity
            });
        }

        await _context.SaveChangesAsync();

        cart = await LoadCartAsync(cart.Id);
        return CreatedAtAction(nameof(GetCart), MapCartResponse(cart));
    }

    [HttpPut("{cartItemId}")]
    public async Task<ActionResult<CartResponse>> UpdateCartItem(int cartItemId, UpdateCartItemRequest request)
    {
        var cartItem = await _context.CartItems
            .Include(ci => ci.Product)
            .Include(ci => ci.Cart)
            .FirstOrDefaultAsync(ci => ci.Id == cartItemId);

        if (cartItem == null)
        {
            return NotFound(new { message = $"Cart item with id {cartItemId} was not found." });
        }

        cartItem.Quantity = request.Quantity;
        await _context.SaveChangesAsync();

        var cart = await LoadCartAsync(cartItem.CartId);
        return Ok(MapCartResponse(cart));
    }

    [HttpDelete("{cartItemId}")]
    public async Task<ActionResult<CartResponse>> RemoveCartItem(int cartItemId)
    {
        var cartItem = await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.Id == cartItemId);

        if (cartItem == null)
        {
            return NotFound(new { message = $"Cart item with id {cartItemId} was not found." });
        }

        var cartId = cartItem.CartId;

        _context.CartItems.Remove(cartItem);
        await _context.SaveChangesAsync();

        var cart = await LoadCartAsync(cartId);
        return Ok(MapCartResponse(cart));
    }

    [HttpDelete("clear")]
    public async Task<ActionResult<CartResponse>> ClearCart()
    {
        var cart = await GetOrCreateCartAsync();

        _context.CartItems.RemoveRange(cart.Items);
        await _context.SaveChangesAsync();

        cart = await LoadCartAsync(cart.Id);
        return Ok(MapCartResponse(cart));
    }

    private async Task<Cart> EnsureCartExistsAsync()
    {
        var cart = await _context.Carts
            .FirstOrDefaultAsync(c => c.UserId == DemoUserId);

        if (cart == null)
        {
            cart = new Cart
            {
                UserId = DemoUserId
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        return cart;
    }

    private async Task<Cart> GetOrCreateCartAsync()
    {
        var existingCart = await _context.Carts
            .Include(c => c.Items)
                .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == DemoUserId);

        if (existingCart != null)
        {
            return existingCart;
        }

        var newCart = new Cart
        {
            UserId = DemoUserId
        };

        _context.Carts.Add(newCart);
        await _context.SaveChangesAsync();

        return await LoadCartAsync(newCart.Id);
    }

    private async Task<Cart> LoadCartAsync(int cartId)
    {
        return await _context.Carts
            .Include(c => c.Items)
                .ThenInclude(i => i.Product)
            .FirstAsync(c => c.Id == cartId);
    }

    private CartResponse MapCartResponse(Cart cart)
    {
        var items = cart.Items.Select(item => new CartItemResponse
        {
            CartItemId = item.Id,
            ProductId = item.ProductId,
            Title = item.Product?.Title ?? "",
            Price = item.Product?.Price ?? 0,
            Quantity = item.Quantity,
            ImageUrl = item.Product?.ImageUrl ?? "",
            LineTotal = (item.Product?.Price ?? 0) * item.Quantity
        }).ToList();

        return new CartResponse
        {
            CartId = cart.Id,
            UserId = cart.UserId,
            Items = items,
            TotalItems = items.Sum(i => i.Quantity),
            TotalAmount = items.Sum(i => i.LineTotal)
        };
    }
}
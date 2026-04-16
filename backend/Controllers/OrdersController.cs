using System.Security.Claims;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly MarketplaceContext _context;

    public OrdersController(MarketplaceContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<OrderResponse>> CreateOrder(CreateOrderRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.ShippingAddress))
        {
            return BadRequest("Shipping address is required.");
        }

        var userId = GetCurrentUserId();

        var cart = await _context.Carts
            .Include(c => c.Items)
                .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null || !cart.Items.Any())
        {
            return BadRequest("Cart is empty.");
        }

        var order = new Order
        {
            UserId = userId,
            OrderDate = DateTime.UtcNow,
            Status = "Pending",
            ShippingAddress = request.ShippingAddress,
            ConfirmationNumber = $"BM-{Guid.NewGuid().ToString("N")[..8].ToUpper()}",
            Items = cart.Items.Select(item => new OrderItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                UnitPrice = item.Product?.Price ?? 0
            }).ToList()
        };

        order.Total = order.Items.Sum(i => i.UnitPrice * i.Quantity);

        _context.Orders.Add(order);
        _context.CartItems.RemoveRange(cart.Items);

        await _context.SaveChangesAsync();

        var savedOrder = await _context.Orders
            .Include(o => o.Items)
                .ThenInclude(i => i.Product)
            .FirstAsync(o => o.Id == order.Id && o.UserId == userId);

        return CreatedAtAction(nameof(GetMyOrders), MapOrderResponse(savedOrder));
    }

    [HttpGet("mine")]
    public async Task<ActionResult<List<OrderResponse>>> GetMyOrders()
    {
        var userId = GetCurrentUserId();

        var orders = await _context.Orders
            .Include(o => o.Items)
                .ThenInclude(i => i.Product)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return Ok(orders.Select(MapOrderResponse).ToList());
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<OrderResponse>>> GetAllOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.Items)
                .ThenInclude(i => i.Product)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return Ok(orders.Select(MapOrderResponse).ToList());
    }

    [HttpPut("{orderId}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<OrderResponse>> UpdateOrderStatus(
        int orderId,
        UpdateOrderStatusRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Status is required.");
        }

        var allowedStatuses = new[] { "Pending", "Paid", "Shipped", "Completed", "Cancelled" };

        if (!allowedStatuses.Contains(request.Status))
        {
            return BadRequest("Invalid status.");
        }

        var order = await _context.Orders
            .Include(o => o.Items)
                .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null)
        {
            return NotFound();
        }

        order.Status = request.Status;
        await _context.SaveChangesAsync();

        return Ok(MapOrderResponse(order));
    }

    private string GetCurrentUserId()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
        {
            throw new UnauthorizedAccessException("User ID claim is missing.");
        }

        return userId;
    }

    private static OrderResponse MapOrderResponse(Order order)
    {
        return new OrderResponse
        {
            OrderId = order.Id,
            UserId = order.UserId,
            OrderDate = order.OrderDate,
            Status = order.Status,
            Total = order.Total,
            ShippingAddress = order.ShippingAddress,
            ConfirmationNumber = order.ConfirmationNumber,
            Items = order.Items.Select(item => new OrderItemResponse
            {
                OrderItemId = item.Id,
                ProductId = item.ProductId,
                Title = item.Product?.Title ?? string.Empty,
                UnitPrice = item.UnitPrice,
                Quantity = item.Quantity,
                LineTotal = item.UnitPrice * item.Quantity
            }).ToList()
        };
    }
}

public class UpdateOrderStatusRequest
{
    public string Status { get; set; } = string.Empty;
}
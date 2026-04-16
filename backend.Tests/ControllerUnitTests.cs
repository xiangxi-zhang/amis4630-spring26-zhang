using System.Security.Claims;
using backend.Controllers;
using backend.Data;
using backend.DTOs;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Tests;

public class ControllerUnitTests
{
    private static MarketplaceContext CreateContext(string dbName)
    {
        var options = new DbContextOptionsBuilder<MarketplaceContext>()
            .UseInMemoryDatabase(dbName)
            .Options;

        return new MarketplaceContext(options);
    }

    [Fact]
    public async Task ProductsController_GetById_ReturnsNotFound_WhenProductDoesNotExist()
    {
        using var context = CreateContext(nameof(ProductsController_GetById_ReturnsNotFound_WhenProductDoesNotExist));
        var controller = new ProductsController(context);

        var result = await controller.GetById(999);

        result.Result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task OrdersController_CreateOrder_ReturnsBadRequest_WhenShippingAddressIsEmpty()
    {
        using var context = CreateContext(nameof(OrdersController_CreateOrder_ReturnsBadRequest_WhenShippingAddressIsEmpty));
        var controller = new OrdersController(context);

        var request = new CreateOrderRequest
        {
            ShippingAddress = ""
        };

        var result = await controller.CreateOrder(request);

        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    [Fact]
    public async Task OrdersController_CreateOrder_ReturnsBadRequest_WhenCartIsEmpty()
    {
        using var context = CreateContext(nameof(OrdersController_CreateOrder_ReturnsBadRequest_WhenCartIsEmpty));

        var controller = new OrdersController(context);
        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(
                    new ClaimsIdentity(
                        new[]
                        {
                            new Claim(ClaimTypes.NameIdentifier, "test-user-1")
                        },
                        "TestAuth"))
            }
        };

        var request = new CreateOrderRequest
        {
            ShippingAddress = "123 Test Street"
        };

        var result = await controller.CreateOrder(request);

        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }
}

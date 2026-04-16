using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using backend.Data;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;

namespace backend.Tests;

public class AuthIntegrationTests : IDisposable
{
    private readonly string _testDbPath;
    private readonly WebApplicationFactory<Program> _factory;

    public AuthIntegrationTests()
    {
        _testDbPath = Path.Combine(
            Path.GetTempPath(),
            $"buckeye-integration-{Guid.NewGuid():N}.db");

        Environment.SetEnvironmentVariable(
            "ConnectionStrings__DefaultConnection",
            $"Data Source={_testDbPath}");

        Environment.SetEnvironmentVariable(
            "Jwt__Key",
            "SuperSecretTestKey12345SuperSecretTestKey12345");

        InitializeDatabase();

        _factory = new WebApplicationFactory<Program>();
    }

    private void InitializeDatabase()
    {
        var options = new DbContextOptionsBuilder<MarketplaceContext>()
            .UseSqlite($"Data Source={_testDbPath}")
            .Options;

        using var context = new MarketplaceContext(options);
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();
    }

    [Fact]
    public async Task GetOrders_ReturnsOk_ForAdminUser()
    {
        var client = _factory.CreateClient();

        var loginResponse = await client.PostAsJsonAsync("/api/Auth/login", new
        {
            email = "admin@buckeyemarketplace.com",
            password = "Admin123"
        });

        loginResponse.EnsureSuccessStatusCode();

        var loginData = await loginResponse.Content.ReadFromJsonAsync<LoginResponse>();
        Assert.NotNull(loginData);
        Assert.False(string.IsNullOrWhiteSpace(loginData!.Token));

        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", loginData.Token);

        var response = await client.GetAsync("/api/Orders");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    public void Dispose()
    {
        _factory.Dispose();

        Environment.SetEnvironmentVariable("ConnectionStrings__DefaultConnection", null);
        Environment.SetEnvironmentVariable("Jwt__Key", null);

        if (File.Exists(_testDbPath))
        {
            File.Delete(_testDbPath);
        }
    }

    private class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
    }
}

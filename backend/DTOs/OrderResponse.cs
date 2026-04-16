namespace backend.DTOs
{
    public class OrderItemResponse
    {
        public int OrderItemId { get; set; }
        public int ProductId { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal LineTotal { get; set; }
    }

    public class OrderResponse
    {
        public int OrderId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public decimal Total { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public string ConfirmationNumber { get; set; } = string.Empty;
        public List<OrderItemResponse> Items { get; set; } = new();
    }
}
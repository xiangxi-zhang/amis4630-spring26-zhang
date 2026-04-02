namespace backend.DTOs
{
    public class CartResponse
    {
        public int CartId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public List<CartItemResponse> Items { get; set; } = new();
        public int TotalItems { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
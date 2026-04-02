using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class UpdateCartItemRequest
    {
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class AddCartItemRequest
    {
        [Required]
        public int ProductId { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
}

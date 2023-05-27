using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Price
{
    public int ID { get; set; }
    [Required, Range(0, 100)]
    public float Value { get; set; }
    public int StockID { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


}
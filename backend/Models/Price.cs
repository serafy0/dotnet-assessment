using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Price
{
    public int ID { get; set; }
    [Required, Range(0, 100)]
    public float Value { get; set; }
    public int StockID { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


}
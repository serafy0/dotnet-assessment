using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Order
{
    public int ID { get; set; }
    public int StockID { get; set; }
    public string? Name { get; set; }
    public float Price { get; set; }
    public int Quantity { get; set; }
    public string? Buyer { get; set; }

    public DateTime CreatedAt { get; } = DateTime.UtcNow;



}
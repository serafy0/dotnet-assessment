using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Stock
{
    public int ID { get; set; }
    [Required, Range(0, 100)]
    public float Price { get; set; }
    public string? Name { get; set; }

    public ICollection<Price> Prices { get; } = new List<Price>();


    [JsonIgnore]
    public ICollection<Order> Orders { get; } = new List<Order>();



}
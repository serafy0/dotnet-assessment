using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class StockContext : DbContext
{
    public StockContext(DbContextOptions<StockContext> options)
        : base(options)
    {
    }

    public DbSet<Stock> Stocks { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;

    public DbSet<Price> Prices { get; set; } = null!;




}
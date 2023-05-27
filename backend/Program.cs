using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.BackgroundWorkerService;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEntityFrameworkNpgsql().AddDbContext<StockContext>(
    opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("SampleDbConnection")
    ));
builder.Services.AddHostedService<BackgroundWorkerService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

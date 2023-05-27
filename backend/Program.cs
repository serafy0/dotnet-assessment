using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.BackgroundWorkerService;
using backend.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(
    option => option.AddPolicy("CorsPolicy",
     builder => builder.WithOrigins("http://localhost:4200")
        .AllowAnyMethod().AllowAnyHeader().AllowCredentials()));
builder.Services.AddEntityFrameworkNpgsql().AddDbContext<StockContext>(
    opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("SampleDbConnection")
    ));
builder.Services.AddSignalR();
builder.Services.AddHostedService<BackgroundWorkerService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    SeedStocks.Initialize(services);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred seeding the DB.");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();
app.MapHub<StockHub>("/stockHub");

app.Run();


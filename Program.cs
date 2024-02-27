using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;
using BetApp.Web.Hubs;
using BetApp.Web.Models;



var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
DotNetEnv.Env.Load();


var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");


builder.Services.AddDbContext<DatabaseContext>(
  opt =>
  {
    opt.UseNpgsql(connectionString);
    if (builder.Environment.IsDevelopment())
    {
      opt
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors();
    }
  }
);


builder.Services.AddSignalR();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.MapControllers();
app.MapHub<BetHub>("/r/betHub");


app.MapGet("/", () => "Hello World!");

app.Run();

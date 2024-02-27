using Microsoft.EntityFrameworkCore;

namespace BetApp.Web.Models;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options) { }


    public DbSet<User> Users => Set<User>();
    public DbSet<Bet> Bets => Set<Bet>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // A bet has a user
        modelBuilder.Entity<Bet>()
            .HasOne(b => b.User)
            .WithMany()
            .HasForeignKey(b => b.UserId);

        // Seed 5 users 

        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, Username = "John Doe" },
            new User { Id = 2, Username = "Jane Doe" },
            new User { Id = 3, Username = "Jerry Fan" },
            new User { Id = 4, Username = "Michael" },
            new User { Id = 5, Username = "Scott" }
        );

        // Seed 5 bets
        modelBuilder.Entity<Bet>().HasData(
            new Bet { Id = 1, Item = "Shoes", HighestBid = 100, UserId = 1 },
            new Bet { Id = 2, Item = "Ring", HighestBid = 200, UserId = 2 },
            new Bet { Id = 3, Item = "Telephone", HighestBid = 300, UserId = 3 },
            new Bet { Id = 4, Item = "Milk", HighestBid = 400, UserId = 4 },
            new Bet { Id = 5, Item = "pants", HighestBid = 500, UserId = 5 }
        );

    }

}

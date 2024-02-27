namespace BetApp.Web.Models;

public class Bet
{
  public int Id { get; set; }

  public string Item { get; set; } = "";

  public int HighestBid { get; set; }

  public int UserId { get; set; }

  public User User { get; set; }

}




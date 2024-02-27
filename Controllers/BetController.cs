using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetApp.Web.Models;
using Microsoft.AspNetCore.SignalR;
using BetApp.Web.Hubs;

namespace BetApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BetController : ControllerBase
    {
        private readonly DatabaseContext _context;

        private readonly IHubContext<BetHub> _hubContext;

        public BetController(DatabaseContext context, IHubContext<BetHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/Bet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bet>>> GetBets()
        {
            return await _context.Bets.Include(b => b.User).ToListAsync();
        }

        // GET: api/Bet/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bet>> GetBet(int id)
        {
            var bet = await _context.Bets.FindAsync(id);

            if (bet == null)
            {
                return NotFound();
            }

            return bet;
        }

        // PUT: api/Bet/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBet(int id, Bet bet)
        {
            if (id != bet.Id)
            {
                return BadRequest();
            }

            _context.Entry(bet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        public class BetRequest
        {
            public int UserId { get; set; }
            public int HighestBid { get; set; }
            public string Item { get; set; }
        }

        // POST: api/Bet
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bet>> PostBet(BetRequest betRequest)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(betRequest.UserId);
            if (user == null)
            {
                return BadRequest("User not found");
            }


            var bet = new Bet
            {
                User = user,
                UserId = user.Id,
                HighestBid = betRequest.HighestBid,
                Item = betRequest.Item,
            };

            _context.Bets.Add(bet);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.All.SendAsync("ReceiveBet", bet);

            return CreatedAtAction("GetBet", new { id = bet.Id }, bet);
        }

        // DELETE: api/Bet/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBet(int id)
        {
            var bet = await _context.Bets.FindAsync(id);
            if (bet == null)
            {
                return NotFound();
            }

            _context.Bets.Remove(bet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BetExists(int id)
        {
            return _context.Bets.Any(e => e.Id == id);
        }
    }
}

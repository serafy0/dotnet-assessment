using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

using Microsoft.AspNetCore.SignalR;
using backend.Hubs;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly StockContext _context;
        private readonly IHubContext<OrderHub> _hubContext;


        public OrderController(IHubContext<OrderHub> hubContext, StockContext context)
        {
            _context = context;
            _hubContext = hubContext;


        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }

            return await _context.Orders.Include(order => order.Stock).ToListAsync();
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FirstOrDefaultAsync(order => order.ID == id);

            if (order == null)
            {
                return NotFound();
            }



            return order;
        }

        // PUT: api/Order/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.ID)
            {
                return BadRequest();
            }
            bool stockExists = _context.Stocks.Any(stock => stock.ID == order.StockID);
            if (!stockExists)
            {
                return BadRequest();
            }


            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Order
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            if (_context.Orders == null)
            {
                return Problem("Entity set 'StockContext.Orders'  is null.");
            }
            Stock? stock = await _context.Stocks.FindAsync(order.StockID);
            if (stock == null)
            {
                return BadRequest();
            }

            _context.Orders.Add(order);

            await _context.SaveChangesAsync();

            order.Stock = stock;
            await _hubContext.Clients.All.SendAsync("SendOrder", order);



            return CreatedAtAction("GetOrder", new { id = order.ID }, order);
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return (_context.Orders?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}

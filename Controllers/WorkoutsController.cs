using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using capstone.Data;
using capstone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace capstone.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WorkoutsController : ControllerBase
    {
        private ApplicationDbContext _context;
        public WorkoutsController(ApplicationDbContext context) {
            _context = context;
        }
        [HttpGet]
        public IEnumerable<Workouts> Get()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            Workouts[] workouts = null;
            workouts = _context.Workouts.Where(w => w.UserId == userId).ToArray();
            return workouts;
        }
        [HttpPost]
        public Workouts Post([FromBody]Workouts workout)
        {
            workout.UserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            _context.Workouts.Add(workout);
            _context.SaveChanges();
            return workout;
        }
    }
}

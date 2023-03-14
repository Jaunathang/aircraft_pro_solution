using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aircraft_Pro_Solution.Data;
using Aircraft_Pro_Solution.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Aircraft_Pro_Solution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AircraftsController : Controller
    {
        private readonly AppDbContext _appDbContext;

        public AircraftsController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAircrafts()
        {
            var aircrafts = await _appDbContext.Aircrafts.ToListAsync();

            return Ok(aircrafts);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAircraft(int id)
        {
            var aircraft = await _appDbContext.Aircrafts.FindAsync(id);

            if (aircraft == null)
            {
                return NotFound();
            }

            return Ok(aircraft);
        }

        [HttpPost]
        public async Task<IActionResult> AddAircraft([FromBody] Aircraft newAircraftData)
        {
            await _appDbContext.Aircrafts.AddAsync(newAircraftData);
            await _appDbContext.SaveChangesAsync();

            return Ok(newAircraftData);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateAircraft(int id, [FromBody] Aircraft updatedAircraftData)
        {
            var aircraft = await _appDbContext.Aircrafts.FindAsync(id);

            if (aircraft == null)
            {
                return NotFound();
            }

            aircraft.ModelName = updatedAircraftData.ModelName;
            aircraft.SerialNumber = updatedAircraftData.SerialNumber;
            aircraft.RegistrationNumber = updatedAircraftData.RegistrationNumber;
            aircraft.RegistrationStatus = updatedAircraftData.RegistrationStatus;
            aircraft.RegistrationDate = updatedAircraftData.RegistrationDate;

            await _appDbContext.SaveChangesAsync();

            return Ok(aircraft);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAircraft(int id)
        {
            var aircraft = await _appDbContext.Aircrafts.FindAsync(id);

            if (aircraft == null)
            {
                return NotFound();
            }

            _appDbContext.Aircrafts.Remove(aircraft);
            await _appDbContext.SaveChangesAsync();

            return Ok(aircraft);
        }
    }
}


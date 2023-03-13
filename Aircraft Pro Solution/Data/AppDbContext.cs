using System;
using Microsoft.EntityFrameworkCore;
using Aircraft_Pro_Solution.Models;

namespace Aircraft_Pro_Solution.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Aircraft> Aircrafts { get; set; }
    }
}


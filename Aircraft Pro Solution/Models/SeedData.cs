using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Aircraft_Pro_Solution.Data;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Aircraft_Pro_Solution.Models;

/* A class to populate the database a little bit if empty. */

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new AppDbContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<AppDbContext>>()))
        {
            if (context.Aircrafts.Any())
            {
                return;
            }
            context.Aircrafts.AddRange(
            new Aircraft
                {
                ModelName = "Airbus A320",
                SerialNumber= "345435",
                RegistrationNumber= "D04ISK4",
                RegistrationStatus= true,
                RegistrationDate= new DateTime(1970,01,01),
                },
            new Aircraft
            {
                ModelName = "Boeing 737‑800",
                SerialNumber = "0200093S",
                RegistrationNumber = "D20599S",
                RegistrationStatus = true,
                RegistrationDate = new DateTime(1981, 12, 09),
            },
            new Aircraft
            {
                ModelName = "Diamond Star",
                SerialNumber = "573467",
                RegistrationNumber = "AO299I",
                RegistrationStatus = true,
                RegistrationDate = new DateTime(1999, 03, 29),
            }
            );
            context.SaveChanges();
        }
    }
}
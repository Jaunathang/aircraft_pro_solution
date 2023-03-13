using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aircraft_Pro_Solution.Models

{
    public class Aircraft
    {
        public int Id { get; set; }

        public string ModelName { get; set; } = string.Empty;

        public string SerialNumber { get; set; } = string.Empty;

        public string RegistrationNumber { get; set; } = string.Empty;

        public bool RegistrationStatus { get; set; } = false;

        [Column(TypeName = "Date")]
        public DateTime RegistrationDate { get; set; } = DateTime.Now;

    }
}


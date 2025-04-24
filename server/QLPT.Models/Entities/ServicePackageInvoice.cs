using System;

namespace QLPT.Models.Entities;

public class ServicePackageInvoice
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public double Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public DateTime PaymenNexttDate { get; set; }

    public User? User { get; set; }

}

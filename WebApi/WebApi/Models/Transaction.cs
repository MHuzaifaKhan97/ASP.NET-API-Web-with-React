using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Transaction
    {
        public string TransactionID { get; set; }
        public long CustomerID { get; set; }
        public long Amount { get; set; }
        public string BankName { get; set; }
        public string Currency { get; set; }
        public string MerchantName { get; set; }
    }
}
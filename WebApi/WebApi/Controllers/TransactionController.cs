using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Data;
using System.Data.SqlClient;
using WebApi.Models;
using System.Configuration;

namespace WebApi.Controllers
{
    public class TransactionController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            string query = "select TransactionID, CustomerID, Amount, BankName, MerchantName,Currency from Transactions";

            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["PaymentDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, conn))
            using (var adpt = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                adpt.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public HttpResponseMessage Get(int id)
        {
            DataTable table = new DataTable();
            string query = "select TransactionID, CustomerID, Amount, BankName, MerchantName, Currency from Transactions where CustomerID='"+id+"'";

            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["PaymentDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, conn))
                using(var adpt = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                adpt.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Transaction trans)
        {
            try
            {
                DataTable table = new DataTable();
                string query = "insert into dbo.Transactions Values('" + trans.TransactionID + @"'
                ,'"+trans.CustomerID+@"'
                ,'"+trans.Amount+@"'
                ,'" + trans.BankName+@"'
                ,'"+trans.MerchantName+ @"'
                ,'"+trans.Currency+ @"'
                )";

                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["PaymentDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, conn))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Add Successfully";
            }
            catch (Exception ex)
            {
                return "Failed to Add"+ex.ToString();
            }
        }
    }

}

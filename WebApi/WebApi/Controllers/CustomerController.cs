using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class CustomerController : ApiController
    {
         public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            string query = @"select CustomerID, Email, Mobile, Password from Customers";

            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["PaymentDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, conn))
                using(var adpt = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                adpt.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
            
        }

        public string Post(Customer cus)
        {
            try
            {
                DataTable table = new DataTable();
                string query = "insert into dbo.Customers Values('" + cus.Email + @"'
                ,'" + cus.Mobile + @"'
                ,'" + cus.Password + @"'
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
                return "Failed to Add: "+ex.ToString();
            }
        }
    }
}

using Microsoft.EntityFrameworkCore;

namespace Api
{
    public class WebApiContext : DbContext
    {
        public WebApiContext(DbContextOptions<WebApiContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (optionsBuilder.IsConfigured)
                return;

            optionsBuilder.UseNpgsql($"Server=webapiresources-database-x1dk8knmrruv.cylb9xy5ze1o.eu-north-1.rds.amazonaws.com;" +
                                     $"Database=My-Expenses;" +
                                     $"User Id=myUserName;" +
                                     $"Password=myUserPassword");
            base.OnConfiguring(optionsBuilder);
        }
    }
}

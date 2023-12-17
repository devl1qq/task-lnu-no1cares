using Api.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public class DataContext: DbContext
{
    public DbSet<Item> Items { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }
}

using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Navigos.ePaymentV2.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class ePaymentV2DbContextFactory : IDesignTimeDbContextFactory<ePaymentV2DbContext>
{
    public ePaymentV2DbContext CreateDbContext(string[] args)
    {
        ePaymentV2EfCoreEntityExtensionMappings.Configure();

        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<ePaymentV2DbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));

        return new ePaymentV2DbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../Navigos.ePaymentV2.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}

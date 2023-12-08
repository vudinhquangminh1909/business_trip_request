using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Navigos.ePaymentV2.Data;
using Volo.Abp.DependencyInjection;

namespace Navigos.ePaymentV2.EntityFrameworkCore;

public class EntityFrameworkCoreePaymentV2DbSchemaMigrator
    : IePaymentV2DbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreePaymentV2DbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the ePaymentV2DbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<ePaymentV2DbContext>()
            .Database
            .MigrateAsync();
    }
}

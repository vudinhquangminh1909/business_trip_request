using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Navigos.ePaymentV2.Data;

/* This is used if database provider does't define
 * IePaymentV2DbSchemaMigrator implementation.
 */
public class NullePaymentV2DbSchemaMigrator : IePaymentV2DbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}

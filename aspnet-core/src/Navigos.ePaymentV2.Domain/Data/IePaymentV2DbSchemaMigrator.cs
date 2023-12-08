using System.Threading.Tasks;

namespace Navigos.ePaymentV2.Data;

public interface IePaymentV2DbSchemaMigrator
{
    Task MigrateAsync();
}

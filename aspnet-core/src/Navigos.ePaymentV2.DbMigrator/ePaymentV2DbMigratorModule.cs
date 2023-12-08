using Navigos.ePaymentV2.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Navigos.ePaymentV2.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(ePaymentV2EntityFrameworkCoreModule),
    typeof(ePaymentV2ApplicationContractsModule)
    )]
public class ePaymentV2DbMigratorModule : AbpModule
{
}

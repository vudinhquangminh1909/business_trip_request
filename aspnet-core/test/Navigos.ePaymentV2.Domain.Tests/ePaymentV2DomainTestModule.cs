using Navigos.ePaymentV2.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Navigos.ePaymentV2;

[DependsOn(
    typeof(ePaymentV2EntityFrameworkCoreTestModule)
    )]
public class ePaymentV2DomainTestModule : AbpModule
{

}

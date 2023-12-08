using Volo.Abp.Modularity;

namespace Navigos.ePaymentV2;

[DependsOn(
    typeof(ePaymentV2ApplicationModule),
    typeof(ePaymentV2DomainTestModule)
    )]
public class ePaymentV2ApplicationTestModule : AbpModule
{

}

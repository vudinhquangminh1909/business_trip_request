using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Navigos.ePaymentV2;

[Dependency(ReplaceServices = true)]
public class ePaymentV2BrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "ePaymentV2";
}

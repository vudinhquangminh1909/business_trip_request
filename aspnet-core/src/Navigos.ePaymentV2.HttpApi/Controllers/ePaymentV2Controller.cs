using Navigos.ePaymentV2.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Navigos.ePaymentV2.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class ePaymentV2Controller : AbpControllerBase
{
    protected ePaymentV2Controller()
    {
        LocalizationResource = typeof(ePaymentV2Resource);
    }
}

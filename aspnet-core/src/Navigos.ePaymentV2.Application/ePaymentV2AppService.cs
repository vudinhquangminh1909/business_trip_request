using System;
using System.Collections.Generic;
using System.Text;
using Navigos.ePaymentV2.Localization;
using Volo.Abp.Application.Services;

namespace Navigos.ePaymentV2;

/* Inherit your application services from this class.
 */
public abstract class ePaymentV2AppService : ApplicationService
{
    protected ePaymentV2AppService()
    {
        LocalizationResource = typeof(ePaymentV2Resource);
    }
}

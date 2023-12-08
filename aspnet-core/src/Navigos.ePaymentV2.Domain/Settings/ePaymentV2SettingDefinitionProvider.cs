using Volo.Abp.Settings;

namespace Navigos.ePaymentV2.Settings;

public class ePaymentV2SettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(ePaymentV2Settings.MySetting1));
    }
}

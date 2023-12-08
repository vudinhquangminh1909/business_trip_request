using Navigos.ePaymentV2.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Navigos.ePaymentV2.Permissions;

public class ePaymentV2PermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(ePaymentV2Permissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(ePaymentV2Permissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<ePaymentV2Resource>(name);
    }
}

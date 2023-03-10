
interface AppSetting{
  appName:string;
  appDesc:string;
  appColorPrimary:string;
  appColorSecondary:string;
  appBackgroundPrimaryColor:string;
  appBackgroundSecondaryColor:string;
}

export interface AppSettingUseCaseOutput{
  appSetting:AppSetting
}

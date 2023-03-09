import { Color } from '../../value-objects/colors'

export interface PersistAppSettingUseCaseInput{
  appName:string;
  appDesc:string;
  appColorPrimary:string;
  appColorSecondary:string;
  appBackgroundPrimaryColor:string;
  appBackgroundSecondaryColor:string;
}

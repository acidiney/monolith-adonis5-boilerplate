import { Color } from '../../value-objects/colors'

export interface PersistAppSettingUseCaseInput{
  appName:string;
  appDesc:string;
  appColorPrimary:string;
  appColorSecundary:string;
  appBackgroundPrimaryColor:string;
  appBackgroundSecundaryColor:string;
}

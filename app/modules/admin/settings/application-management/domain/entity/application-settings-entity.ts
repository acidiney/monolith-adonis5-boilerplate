import { Either, Entity, left, Options, right, UniqueEntityID } from 'app/core/domain'
import { AppSettingInputErrors } from '../errors/app-setting-input-errors'
import { Color } from '../value-objects/colors'

interface ApplicationSettingsProps{
  appName:string;
  appDesc:string;
  appColorPrimary:Color;
  appColorSecondary:Color;
  appBackgroundPrimaryColor:Color;
  appBackgroundSecondaryColor:Color;
}

type AppSettingEntityError = AppSettingInputErrors.AppColorRequiredError
| AppSettingInputErrors.AppNameRequiredError | AppSettingInputErrors.AppDescRequiredError |
AppSettingInputErrors.HexadecimalValidad

export class ApplicationSettingsEntity extends Entity<ApplicationSettingsProps>{
  public get appName ():string{
    return this.props.appName
  }

  public get appDesc ():string{
    return this.props.appDesc
  }

  public get appColorPrimary ():string{
    return this.props.appColorPrimary.value
  }

  public get appColorSecondary ():string{
    return this.props.appColorSecondary.value
  }
  public get appBackgroundPrimaryColor ():string{
    return this.props.appBackgroundPrimaryColor.value
  }

  public get appBackgroundSecondaryColor ():string{
    return this.props.appBackgroundSecondaryColor.value
  }
  public changeAppName (name:string):void{
    this.props.appName = name
  }

  public changeAppDesc (description:string):void{
    this.props.appDesc = description
  }

  public changeAppColorPrimary (primaryColor:Color):void{
    this.props.appColorPrimary = primaryColor
  }

  public changeAppColorSecondary (secondColor:Color):void{
    this.props.appColorSecondary = secondColor
  }

  public changeAppBackgroundPrimaryColor (backgroundPrimaryColor:Color):void{
    this.props.appBackgroundPrimaryColor = backgroundPrimaryColor
  }

  public changeAppBackgroundSecondaryColor (backgroundSecondaryColor:Color):void{
    this.props.appBackgroundSecondaryColor = backgroundSecondaryColor
  }

  public delete (): void {
    this._deletedAt= new Date()
  }

  public validateHexadecimalInput (input) {
    var hexRegex = /^[0-9A-Fa-f]+$/
    return hexRegex.test(input)
  }

  public validate (): Either<AppSettingEntityError, boolean>{
    if(!this.props.appName){
      return left(new AppSettingInputErrors.AppNameRequiredError())
    }
    if(!this.props.appDesc){
      return left(new AppSettingInputErrors.AppDescRequiredError())
    }
    if (!this.props.appColorPrimary) {
      return left(new AppSettingInputErrors.AppColorRequiredError())
    }

    return right(true)
  }

  public static create (appName:string,
    appDesc:string,
    appColorPrimary:Color,
    appColorSecondary:Color,
    appBackgroundPrimaryColor:Color,
    appBackgroundSecondaryColor:Color,): Either<AppSettingInputErrors.AppNameRequiredError,
    ApplicationSettingsEntity>{
    if (appName.trim().length === 0) {
      return left(new AppSettingInputErrors.AppNameRequiredError())
    }

    if (appDesc.trim().length === 0) {
      return left(new AppSettingInputErrors.AppDescRequiredError())
    }

    const appSetting = new ApplicationSettingsEntity({
      appName,
      appDesc,
      appColorPrimary,
      appColorSecondary,
      appBackgroundPrimaryColor,
      appBackgroundSecondaryColor,
    })

    return right(appSetting)
  }

  public static hydrate (id: UniqueEntityID, props: ApplicationSettingsProps,
    options?: Options): Either<AppSettingEntityError,
        ApplicationSettingsEntity>{
    const applicationSettingEntity = new ApplicationSettingsEntity(props, id, options)

    const validation = applicationSettingEntity.validate()

    if (validation.isLeft()) {
      return left(validation.value)
    }

    return right(applicationSettingEntity)
  }
}

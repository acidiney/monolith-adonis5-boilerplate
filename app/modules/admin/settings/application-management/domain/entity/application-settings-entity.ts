import { Either, Entity, left, Options, right, UniqueEntityID } from 'app/core/domain'
import { AppSettingInputErrors } from '../errors/app-setting-input-errors'

interface ApplicationSettingsProps{
  appName:string;
  appDesc:string;
  appColorPrimary:string;
  appColorSecondary:string;
  appBackgroundPrimaryColor:string;
  appBackgroundSecondaryColor:string;

}

type AppSettingEntityError = AppSettingInputErrors.AppColorRequiredError
| AppSettingInputErrors.AppNameRequiredError | AppSettingInputErrors.AppDescRequiredError

export class ApplicationSettingsEntity extends Entity<ApplicationSettingsProps>{
  public get appName ():string{
    return this.props.appName
  }

  public get appDesc ():string{
    return this.props.appDesc
  }

  public get appColorPrimary ():string{
    return this.props.appColorPrimary
  }

  public get appColorSecondary ():string{
    return this.props.appColorSecondary
  }
  public get appBackgroundPrimaryColor ():string{
    return this.props.appBackgroundPrimaryColor
  }

  public get appBackgroundSecondaryColor ():string{
    return this.props.appBackgroundSecondaryColor
  }
  public changeAppName (name:string):void{
    this.props.appName = name
  }

  public changeAppDesc (description:string):void{
    this.props.appDesc = description
  }

  public changeAppColorPrimary (primaryColor:string):void{
    this.props.appColorPrimary = primaryColor
  }

  public changeAppColorSecondary (secondColor:string):void{
    this.props.appColorSecondary = secondColor
  }

  public changeAppBackgroundPrimaryColor (backgroundPrimaryColor:string):void{
    this.props.appBackgroundPrimaryColor = backgroundPrimaryColor
  }

  public changeAppBackgroundSecondaryColor (backgroundSecondaryColor:string):void{
    this.props.appBackgroundSecondaryColor = backgroundSecondaryColor
  }

  public delete (): void {
    this._deletedAt= new Date()
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

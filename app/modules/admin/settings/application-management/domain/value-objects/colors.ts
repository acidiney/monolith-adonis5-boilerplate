import { Either, left, right, ValueObject } from 'app/core/domain'
import { AppSettingInputErrors } from '../errors/app-setting-input-errors'

interface AppColorsProp{
  value: string

}

export class Color extends ValueObject<AppColorsProp>{
  protected constructor (
    protected readonly prop:AppColorsProp
  ) {
    super(prop)
  }

  private validate () {
    var hexRegex = /^[0-9A-Fa-f]+$/
    return hexRegex.test(this.props.value)
  }

  public static create (props: AppColorsProp): Either<AppSettingInputErrors.AppColorRequiredError,
        Color>{
    if (
      props.value.trim().length === 0
    ) {
      return left(new AppSettingInputErrors.AppColorRequiredError())
    }

    const color = new Color(props)

    if (!color.validate()) {
      return left(new AppSettingInputErrors.HexadecimalIsNotValid())
    }

    return right(color)
  }

  public get value (): string {
    return this.props.value
  }
}

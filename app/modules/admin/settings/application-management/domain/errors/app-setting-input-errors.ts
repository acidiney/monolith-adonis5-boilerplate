
import {DomainError, Result} from 'app/core/domain'

export namespace AppSettingInputErrors {
  export class AppNameRequiredError extends Result<DomainError> {
    constructor () {
      super(false, {
        message: 'admin.settings.application-management.app_name.required',
        error: AppNameRequiredError.name,
      })
    }
  }

  export class AppDescRequiredError extends Result<DomainError> {
    constructor () {
      super(false, {
        message: 'admin.settings.application-management.app_desc.required',
        error: AppDescRequiredError.name,
      })
    }
  }

  export class AppColorRequiredError extends Result<DomainError> {
    constructor () {
      super(false, {
        message: 'admin.settings.application-management.app_color.required',
        error: AppDescRequiredError.name,
      })
    }
  }

  export class HexadecimalValidad extends Result<DomainError> {
    constructor () {
      super(false, {
        message: 'admin.settings.application-management.app_color.hexadecimal.not_valid',
        error: AppDescRequiredError.name,
      })
    }
  }
}

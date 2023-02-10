import {Either, left, right, ValueObject} from 'app/core/domain'
import {EmailError} from 'app/modules/@shared/domain/errors'

interface EmailProps {
  email: string
}

const VALIDATE_EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export class Email extends ValueObject<EmailProps> {
  public get value (): string {
    return this.props.email.trim()
  }
  private validate (): Either<EmailError.EmailInvalidError | EmailError.EmailRequiredError, boolean> {
    if (!this.props.email) {
      return left(new EmailError.EmailRequiredError())
    }

    if (!VALIDATE_EMAIL_REGEX.test(this.props.email)) {
      return left(new EmailError.EmailInvalidError())
    }

    return right(true)
  }

  public static create (email: string): Either<
    EmailError.EmailInvalidError | EmailError.EmailRequiredError, Email> {
    const emailValueObject = new Email({ email })

    const emailValidation = emailValueObject.validate()

    if (emailValidation.isLeft()) {
      return left(emailValidation.value)
    }

    return right(emailValueObject)
  }
}

import { SignInController } from '../controllers/sign-in-controller'

export const makeSignInController = (): SignInController => new SignInController()

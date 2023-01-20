import { LogoutController } from '../controllers/logout-controller'

export const makeLogoutFactory = (): LogoutController => new LogoutController()

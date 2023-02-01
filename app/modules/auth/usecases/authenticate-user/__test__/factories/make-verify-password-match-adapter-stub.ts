import {VerifyPasswordMatchAdapter} from 'app/modules/auth/usecases'

export const makeVerifyPasswordMatchAdapterStub = (): VerifyPasswordMatchAdapter => {
  return new class implements VerifyPasswordMatchAdapter {
    public compare (_hash: string, _plain: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }()
}

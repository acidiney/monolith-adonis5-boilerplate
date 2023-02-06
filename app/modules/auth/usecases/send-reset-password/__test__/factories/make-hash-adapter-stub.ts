import {HashAdapter} from 'app/modules/auth/usecases'

export const makeHashAdapterStub = (): HashAdapter => {
  return new (class implements HashAdapter {
    public generate (_secret: string, _payload: string): Promise<string> {
      return Promise.resolve('valid_token')
    }
  })()
}

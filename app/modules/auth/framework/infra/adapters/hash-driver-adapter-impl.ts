import crypto from 'node:crypto'
import { HashAdapter } from '../db/repositories/generate-reset-password-token/ports/hash-adapter'

export class HashDriverAdapterImpl implements HashAdapter {
  public async generate (secret: string, payload: string): Promise<string> {
    const hmac = await crypto.createHmac('sha256', secret)
    hmac.update(payload)

    return hmac.digest('hex')
  }
}

import Env from '@ioc:Adonis/Core/Env'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { UploadService } from '../../main/ports/upload-service'

export class UploadServiceImpl implements UploadService {
  public async upload (avatar: MultipartFileContract, path: string): Promise<string> {
    await avatar.moveToDisk(`./${path}`)

    return `${Env.get('APP_INTERNAL_URL')}/public/${path}/${avatar.fileName}`
  }
}

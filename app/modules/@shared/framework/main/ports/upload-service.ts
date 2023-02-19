import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

export interface UploadService {
  upload (avatar: MultipartFileContract, path: string): Promise<string>
}

import { Addon } from '../../../domain/entities/addon'

export interface RetrieveAddonsService {
  retrieveAll: () => Promise<Addon[]>
}

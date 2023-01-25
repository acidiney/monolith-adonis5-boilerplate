import { Addon } from '../../../domain/entities/addon'

export interface CompareAddonsRepository {
  compare (addons: Addon[]): Promise<Addon[]>
}

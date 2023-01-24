import { UniqueEntityID, UseCase } from 'app/core/domain'

export type InstallAddonUseCase = UseCase<{ addonName: string, version: number, currentUserId: UniqueEntityID }, void>

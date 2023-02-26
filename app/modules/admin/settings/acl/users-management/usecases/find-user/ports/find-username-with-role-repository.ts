import { UserRoleAggregate } from 'app/modules/@shared/domain/aggregates/user-role-aggregate'

export interface FindUsernameWithRoleRepository {
  findUsername (username: string): Promise<UserRoleAggregate | undefined>
}

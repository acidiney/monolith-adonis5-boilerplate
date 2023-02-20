export enum StatusEnum{
  APPROVED = 'approved',
  CANCELED = 'canceled',
  ACTIVE = 'active',
  PENDING = 'pending',
  INACTIVE = 'inactive',
  DELETED = 'deleted'
}

export type StatusType = StatusEnum.ACTIVE | StatusEnum.APPROVED |
StatusEnum.PENDING | StatusEnum.CANCELED | StatusEnum.INACTIVE | StatusEnum.DELETED

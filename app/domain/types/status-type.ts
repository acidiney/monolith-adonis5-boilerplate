export enum StatusEnum{
  APPROVED = 'approved',
  CANCELED = 'canceled',
  ACTIVE = 'active',
  PENDING = 'pending'
}

export type StatusType = StatusEnum.ACTIVE | StatusEnum.APPROVED | StatusEnum.PENDING | StatusEnum.CANCELED

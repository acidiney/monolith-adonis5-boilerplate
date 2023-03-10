import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CoreStatusModel } from 'app/modules/@shared/framework/infra/db/models'

export default class InsertBaseStatusesSeed extends BaseSeeder {
  public async run () {
    const statuses = [
      {
        id: 'approved',
        key: 'shared.status.approved',
      },
      {
        id: 'active',
        key: 'shared.status.active',
      },
      {
        id: 'inactive',
        key: 'shared.status.inactive',
      },
      {
        id: 'rejected',
        key: 'shared.status.rejected',
      },
      {
        id: 'pending',
        key: 'shared.status.pending',
      },
      {
        id: 'canceled',
        key: 'shared.status.canceled',
      },
      {
        id: 'deleted',
        key: 'shared.status.deleted',
      },
    ]

    await CoreStatusModel.fetchOrCreateMany('id', statuses)
  }
}

import { Entity } from 'app/core/domain'
import { ColorPallet } from '../values-objects/color-pallet'

interface DashboardProp {
  name: string
  slug?: string
  description?: string
  colorPallet: ColorPallet
}

export class Dashboard extends Entity<DashboardProp> {
  public static create (props: DashboardProp): Dashboard {
    return new Dashboard(props)
  }
}

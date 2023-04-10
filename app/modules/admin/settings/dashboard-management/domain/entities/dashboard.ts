import { Entity } from 'app/core/domain'
import { ColorPallet } from '../values-objects/color-pallet'
import { DashboardItem } from '../values-objects/dashboard-item'

interface DashboardProp {
  name: string
  slug?: string
  description?: string
  colorPallet: ColorPallet
  items: DashboardItem[]
}

export class Dashboard extends Entity<DashboardProp> {
  public static create (props: DashboardProp): Dashboard {
    return new Dashboard(props)
  }
}

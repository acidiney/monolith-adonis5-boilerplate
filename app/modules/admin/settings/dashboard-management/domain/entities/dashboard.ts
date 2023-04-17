import { Either, Entity, left, right } from 'app/core/domain'
import { DashboardErrors } from '../errors/dashboard-errors'
import { Indicator } from '../values-objects'

interface DashboardProp {
  name: string
  slug?: string
  description?: string
  items: Indicator[]
}

const MINIMUN_DASHBOARD_NAME_CHARS = 3

export class Dashboard extends Entity<DashboardProp> {
  public static create (props: DashboardProp): Either<DashboardErrors.InvalidDashboardName, Dashboard> {
    if (!props.name || props.name?.length < MINIMUN_DASHBOARD_NAME_CHARS) {
      return left(new DashboardErrors.InvalidDashboardName())
    }

    return right(new Dashboard(props))
  }
}

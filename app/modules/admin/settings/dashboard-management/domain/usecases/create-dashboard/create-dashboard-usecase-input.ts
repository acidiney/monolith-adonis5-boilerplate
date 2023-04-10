import { ColorPallet } from '../../values-objects/color-pallet'

export interface CreateDashboardUseCaseInput {
  name: string
  description?: string
  colorPallet: ColorPallet
}

import {cuid} from '@ioc:Adonis/Core/Helpers'
import {BaseModel, beforeCreate, beforeFetch, column} from '@ioc:Adonis/Lucid/Orm'
import {DateTime} from 'luxon'

export interface Menu {
  display: string
  url: string,
  icon?: string,
  isGroup: boolean,
  children?: Menu[]
}

export class MenuModel extends BaseModel {
  public static table = 'menus'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'name' })
  public display: string

  @column({ columnName: 'slug' })
  public slug: string

  @column()
  public url: string

  @column()
  public icon?: string

  @column()
  public order: number

  @column()
  public groupName?: string

  @column()
  public isGroup?: boolean

  @column()
  public belongsTo: string | null

  @column({ columnName: 'permission_id' })
  public permissionId?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async assignNanoId (menu: MenuModel) {
    menu.id = menu.id || cuid()
  }

  @beforeFetch()
  public static applyOrderBy (query) {
    query.orderBy('order', 'asc')
  }

  public static loadMenuBasedInUserPermissions (permissions: string[]) {
    return MenuModel.query()
      .whereNull('permissionId')
      .orWhereIn('permission_id', permissions)
      .andWhereNull('deleted_at')
      .orderBy('order', 'asc')
      .then((menus) => {
        const principalMenus = menus.filter((menu) => !menu.belongsTo)

        return principalMenus.map((menu) => {
          return this.constructMenuMapped({
            display: menu.display,
            icon: menu.icon,
            url: menu.url,
            isGroup: menu.isGroup ?? false,
            children: this.createSubMenuStructure(menus, menu.slug),
          })
        })
      })
  }

  private static constructMenuMapped (menu: Menu): Menu {
    return {
      display: menu.display,
      url: menu.url,
      icon: menu.icon,
      isGroup: menu.isGroup,
      children: menu.children,
    }
  }

  private static createSubMenuStructure (originalMenuArray, belongsTo) {
    let onlyBelongsToArray = originalMenuArray.filter(
      (menu) => menu.belongsTo === belongsTo
    )
    onlyBelongsToArray = onlyBelongsToArray.sort((a, b) => (a > b ? -1 : 1))

    if (!onlyBelongsToArray.length) {
      return
    }

    const three: Menu[] = []

    for (let subMenu of onlyBelongsToArray) {
      three.push(
        this.constructMenuMapped({
          display: subMenu.display,
          url: subMenu.url,
          icon: subMenu.icon,
          isGroup: subMenu.isGroup,
          children: this.createSubMenuStructure(originalMenuArray, subMenu.slug),
        })
      )
    }

    return three
  }
}

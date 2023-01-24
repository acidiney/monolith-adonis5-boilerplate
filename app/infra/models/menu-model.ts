import { cuid } from '@ioc:Adonis/Core/Helpers'
import { BaseModel, beforeCreate, beforeFetch, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { capitalize } from 'vue'

export interface Menu {
  display: string
  url: string,
  icon?: string,
  children?: Menu[]
}

export class MenuModel extends BaseModel {
  public static table = 'menus'
  public static selfAssignPrimaryKey = true

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

  public static loadMenuBaseadInUserPermissions (permissions: string[]) {
    return MenuModel.query()
      .whereNull('permissionId')
      .orWhereIn('permission_id', permissions)
      .orderBy('order', 'asc')
      .then((menus) => {
        const principalMenus = menus.filter((menu) => !menu.belongsTo)

        return principalMenus.map((menu) => {
          const menuMapped = this.constructMenuMapped({
            display: menu.display,
            icon: menu.icon,
            url: menu.url,
            children: this.createSubMenuStructure(menus, menu.slug),
          })
          return menuMapped
        })
      })
  }

  private static constructMenuMapped (menu: Menu): Menu {
    return {
      display: menu.display,
      url: menu.url,
      icon: menu.icon,
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
          children: this.createSubMenuStructure(originalMenuArray, subMenu.slug),
        })
      )
    }

    return three
  }
}
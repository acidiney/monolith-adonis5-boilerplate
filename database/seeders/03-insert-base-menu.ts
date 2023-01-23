import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class MenuSeedSeeder extends BaseSeeder {
  public async run () {
    const menus = [
      {
        name: 'Main',
        url: '',
        icon: '',
        order: 1,
        isGroup: true,
        permission: 'view-dashboard',
        children: [
          {
            name: 'Menu Inicial',
            url: '/account/dashboard',
            icon: 'home',
            order: 1,
            permission: 'view-dashboard',
          },
        ],
      },
      {
        name: 'Templates',
        url: '',
        icon: '',
        permission: 'read-templates',
        order: 2,
        isGroup: true,
        groupName: 'Templates',
        children: [
          {
            name: 'Listar templates',
            url: '/account/templates',
            icon: 'book',
            order: 1,
            permission: 'read-templates',
          },
          {
            name: 'Componentes compartilhados',
            url: '/account/templates/components',
            icon: 'grid',
            order: 3,
            permission: 'read-components',
          },
          {
            name: 'Ver agendamentos',
            url: '/account/templates/schedules',
            icon: 'calendar',
            order: 2,
            permission: 'read-schedules',
          },
          {
            name: 'Histórico de submissões',
            url: '/account/templates/histories',
            icon: 'layers',
            order: 3,
            permission: 'read-template-histories',
          },
        ],
      },
      {
        name: 'Grupos',
        url: '',
        icon: '',
        order: 3,
        isGroup: true,
        permission: 'read-groups',
        children: [
          {
            name: 'Ver Grupos',
            url: '/account/groups',
            icon: 'link',
            order: 1,
            permission: 'read-groups',
          },
        ],
      },
      {
        name: 'Organismos',
        url: '',
        icon: '',
        order: 4,
        isGroup: true,
        permission: 'read-organisms',
        children: [
          {
            name: 'Listar organismos',
            url: '/account/organisms',
            icon: 'briefcase',
            order: 3,
            permission: 'read-organisms',
          },
        ],
      },
      {
        name: 'Actividades',
        url: '',
        icon: '',
        order: 5,
        isGroup: true,
        permission: 'read-logs',
        children: [
          {
            name: 'Ver registos gerais',
            url: '/account/logs',
            icon: 'terminal',
            order: 1,
            permission: 'read-logs',
          },
        ],
      },
      {
        name: 'Configurações',
        url: '',
        icon: '',
        order: 6,
        isGroup: true,
        groupName: 'Configurações',
        children: [
          {
            name: 'Controle de Acesso',
            url: '/account/settings/acl',
            icon: 'users',
            order: 1,
            isGroup: true,
            groupName: 'Controle de Acesso',
            children: [
              {
                name: 'Utilizadores',
                url: '/account/settings/acl/users',
                icon: '',
                divider: false,
                order: 1,
                permission: 'read-users',
              },
              {
                name: 'Perfis',
                url: '/account/settings/acl/roles',
                icon: '',
                divider: false,
                order: 2,
                permission: 'read-roles',
              },
            ],
          },
          {
            name: 'Configurar dashboards',
            url: '/account/settings/dashboard',
            icon: 'layout',
            order: 4,
            permission: 'configure-dashboards',
          },
          // {
          //   name: 'Tradução',
          //   url: '/account/configs/traducao',
          //   icon: '',
          //   order: 5,
          //   permission: 'list-locales',
          // },
          {
            name: 'Configurar aplicação',
            url: '/account/settings/application',
            icon: 'target',
            order: 6,
            permission: 'configure-application',
          },
          {
            name: 'Marketplace',
            url: '/account/settings/marketplace',
            icon: 'target',
            divider: false,
            order: 7,
            permission: 'view-marketplace',
          },
        ],
      },
    ]

    for (let menu of menus) {
      // console.log(menu)
      // await this.registerMenu(menu, null)
    }
  }

  // private async registerMenu(menuLine, belongsTo: string | null) {
  //   const {
  //     name,
  //     url,
  //     permission = null,
  //     icon,
  //     children = null,
  //     order,
  //     isGroup,
  //     groupName,
  //   } = menuLine

  //   let permissionId
  //   if (permission) {
  //     permissionId = (await this.permissionRepo.findBySlug(permission))?.id
  //   }

  //   const createdMenu = await this.menuRepo.create({
  //     name,
  //     url,
  //     icon,
  //     permission: permissionId,
  //     belongsTo,
  //     isGroup,
  //     groupName,
  //     order,
  //   })

  //   if (children) {
  //     for (let child of children) {
  //       await this.registerMenu(child, createdMenu.id)
  //     }
  //   }
  // }
}

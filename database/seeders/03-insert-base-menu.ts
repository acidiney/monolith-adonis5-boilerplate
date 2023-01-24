import { MenuModel } from 'app/infra/models/menu-model'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class MenuSeedSeeder extends BaseSeeder {
  public async run () {
    // const menus = [
    //   // {
    //   //   name: 'Templates',
    //   //   url: '',
    //   //   icon: '',
    //   //   order: 2,
    //   //   isGroup: true,
    //   //   groupName: 'Templates',
    //   //   children: [
    //   //     {
    //   //       name: 'Listar templates',
    //   //       url: '/account/templates',
    //   //       icon: 'book',
    //   //       order: 1,
    //   //       permission: 'view-templates',
    //   //     },
    //   //     {
    //   //       name: 'Histórico de submissões',
    //   //       url: '/account/templates/submissions',
    //   //       icon: 'layers',
    //   //       order: 3,
    //   //       permission: 'view-submissions',
    //   //     },
    //   //   ],
    //   // },
    //   // {
    //   //   name: 'Grupos',
    //   //   url: '',
    //   //   icon: '',
    //   //   order: 3,
    //   //   isGroup: true,
    //   //   children: [
    //   //     {
    //   //       name: 'Ver Grupos',
    //   //       url: '/account/groups',
    //   //       icon: 'link',
    //   //       order: 1,
    //   //       permission: 'view-groups',
    //   //     },
    //   //   ],
    //   // },
    //   // {
    //   //   name: 'Organismos',
    //   //   url: '',
    //   //   icon: '',
    //   //   order: 4,
    //   //   isGroup: true,
    //   //   children: [
    //   //     {
    //   //       name: 'Listar organismos',
    //   //       url: '/account/organisms',
    //   //       icon: 'briefcase',
    //   //       order: 3,
    //   //       permission: 'view-organisms',
    //   //     },
    //   //   ],
    //   // },
    //   // {
    //   //   name: 'Actividades',
    //   //   url: '',
    //   //   icon: '',
    //   //   order: 5,
    //   //   isGroup: true,
    //   //   children: [
    //   //     {
    //   //       name: 'Ver registos gerais',
    //   //       url: '/account/logs',
    //   //       icon: 'terminal',
    //   //       order: 1,
    //   //       permission: 'view-logs',
    //   //     },
    //   //   ],
    //   // },
    //   // {
    //   //   name: 'Configurações',
    //   //   url: '',
    //   //   icon: '',
    //   //   order: 6,
    //   //   isGroup: true,
    //   //   groupName: 'Configurações',
    //   //   children: [
    //   //     {
    //   //       name: 'Controle de Acesso',
    //   //       url: '/account/settings/acl',
    //   //       icon: 'users',
    //   //       order: 1,
    //   //       isGroup: true,
    //   //       groupName: 'Controle de Acesso',
    //   //     },
    //   //     {
    //   //       name: 'Configurar dashboards',
    //   //       url: '/account/settings/dashboard',
    //   //       icon: 'layout',
    //   //       order: 4,
    //   //       permission: 'configure-dashboards',
    //   //     },
    //   //     // {
    //   //     //   name: 'Tradução',
    //   //     //   url: '/account/configs/traducao',
    //   //     //   icon: '',
    //   //     //   order: 5,
    //   //     //   permission: 'list-locales',
    //   //     // },
    //   //     {
    //   //       name: 'Configurar aplicação',
    //   //       url: '/admin/settings/application',
    //   //       icon: 'target',
    //   //       order: 6,
    //   //       permission: 'admin-setup-application',
    //   //     },
    //   //     {
    //   //       name: 'Marketplace',
    //   //       url: '/admin/settings/marketplace',
    //   //       icon: 'target',
    //   //       divider: false,
    //   //       order: 7,
    //   //       permission: 'admin-view-marketplace',
    //   //     },
    //   //   ],
    //   // },
    // ]

    await MenuModel.createMany([
      {
        display: 'menu.main.dashboard',
        slug: 'main_dashboard',
        url: '/account/dashboard',
        icon: 'home',
        order: 1,
        permissionId: 'view-dashboard',
        belongsTo: 'group_main',
      },
      {
        display: 'menu.acl.view-users',
        slug: 'setting_acl_view_users',
        url: '/account/settings/acl/users',
        icon: 'users',
        order: 1,
        permissionId: 'admin-acl-view-users',
        belongsTo: 'group_settings',
      },
      {
        display: 'menu.acl.view-roles',
        slug: 'setting_acl_view_roles',
        url: '/account/settings/acl/roles',
        icon: 'user',
        order: 2,
        permissionId: 'admin-acl-view-roles',
        belongsTo: 'group_settings',
      },
    ])
  }
}

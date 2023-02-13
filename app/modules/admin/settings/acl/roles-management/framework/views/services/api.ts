import {PermissionGroup} from '../interfaces/permission-group'

export const api = {
  loadPermissions: async (): Promise<PermissionGroup[]> => {
    return [
      {
        title: 'shared.create-user.group',
        id: 'id1',
        permissions: [
          {
            slug: 'create-user',
            display: 'create-user-display',
          },
        ],
      },
    ]
  },
}

import {router} from '@inertiajs/vue3'

export const apiService = {
  createRole: async (form, redirect) => {
    return new Promise((resolve) =>
      router.post('/account/admin/settings/acl/roles/create', {
        ...form,
        redirect,
      }, {
        onFinish: () => {
          resolve()
        },
      }))
  },

  deleteRole: async (roleId) => {
    return new Promise((resolve) =>
      router.delete('/account/admin/settings/acl/roles/delete', {
        data: {
          roleId,
        },
      }, {
        onFinish: () => {
          resolve()
        },
      }))
  },
}

import {router} from '@inertiajs/vue3'

export const apiService = {
  createRole: async (form) => {
    return new Promise((resolve) => router.post('/account/admin/settings/acl/roles/create', form, {
      onFinish: () => {
        resolve()
      },
    }))
  },
}

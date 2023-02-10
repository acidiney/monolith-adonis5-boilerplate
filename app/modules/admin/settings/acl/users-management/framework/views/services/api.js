import axios from 'axios'
import { router } from '@inertiajs/vue3'

export const apiService = {
  loadRoles: () => {
    return axios.get('/api/admin/settings/acl/roles/dropdown')
  },

  createUser: (form) => {
    return new Promise((resolve) => {
      return router.post("/account/admin/settings/acl/user", form, {
        onFinish: (data) => {
          resolve(data)
        },
      })
    })
  }
}

import axios from 'axios'

export const loadRoles = () => {
  return axios.get('/api/admin/settings/acl/roles/dropdown')
}

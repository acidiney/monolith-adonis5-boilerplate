import axios from 'axios'
export const apiService = {
  notifications () {
    return axios.get('/api/account/me/notifications')
  },
}

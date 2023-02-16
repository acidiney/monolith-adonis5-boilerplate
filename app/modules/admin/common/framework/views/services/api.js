import axios from "axios";

export const apiService = {
    updateNotifications: async (form) => {
        return axios.put('/api/account/notifications', form)
    }
}

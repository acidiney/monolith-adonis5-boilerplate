import { router } from "@inertiajs/vue3";
import axios from "axios";

export const apiService = {
    updateNotifications: async (form) => {
        return axios.put('/api/account/notifications', form)
    },
    updatePassword: async (form) => {
        return new Promise((resolve) => {
            return router.put('/account/settings/password', form, {
                onFinish: () => {
                    resolve()
                },
            })
        })
    }
}

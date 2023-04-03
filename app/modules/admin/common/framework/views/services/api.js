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
    },
    updateUserInfo: async (form) => {
        return new Promise((resolve) => {
            return router.put('/account/settings/user/info', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onFinish: () => {
                    resolve()
                },
            })
        })
    },
    retrieveActivities: async (userId) => {
        return axios.get(`/api/account/${userId}/activities`)
    },
    retrieveDashboardSettings: async () => {
      return [
        {
          display: "NoDashboard",
          id: "default",
          default: true,
          options: []
        },
      ];
    },
    retrieveDashboardRefreshOptions: async () => {
      return {
        options: ["5sec", "5min", "10min", " 30min", "1h"],
        default: '5sec'
      }
    }
}

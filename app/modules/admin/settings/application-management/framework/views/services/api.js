import axios from 'axios'
import { router } from '@inertiajs/vue3'

export const apiService = {

  createAppSetting: (form) => {
    return new Promise((resolve) => {
      return router.post("/account/admin/settings/acl/appSettings", form, {
        onSuccess: (data) => {
          resolve(data);
        },
      });
    });
  },





};

export const useApiService = () => {

  const onSortChange = (e) => {
    console.log(e)
  }

  const errorHandler = () => true
  return {
    errorHandler,

    onSortChange,

  }
}

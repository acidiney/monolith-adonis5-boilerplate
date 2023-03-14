import { router } from '@inertiajs/vue3'

export const apiService = {

  updateAppSetting: (form) => {
    
    return new Promise((resolve) => {
      return router.put("/admin/settings/appSettings", form, {       
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

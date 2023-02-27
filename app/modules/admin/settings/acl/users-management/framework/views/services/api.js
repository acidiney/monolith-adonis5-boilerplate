import axios from 'axios'
import { router } from '@inertiajs/vue3'

export const apiService = {
  loadRoles: () => {
    return axios.get("/api/admin/settings/acl/roles/dropdown");
  },

  createUser: (form) => {
    return new Promise((resolve) => {
      return router.post("/account/admin/settings/acl/user", form, {
        onSuccess: (data) => {
          resolve(data);
        },
      });
    });
  },

  updateUser: (username, form) => {
    return new Promise((resolve) => {
      return router.put(
        `/account/admin/settings/acl/user/${username}`,
        form,
        {
          onSuccess: (data) => {
            resolve(data);
          },
        }
      );
    });
  },
  deleteUser: (form) => {
    return new Promise((resolve) => {
      return router.delete(
        "/account/admin/settings/acl/user",
        { data: form },
        {
          onFinish: (data) => {
            resolve(data);
          },
        }
      );
    });
  },
  redefinePassword: (form) => {
    return new Promise((resolve) => {
      return router.put(
        "/account/admin/settings/acl/user/redefine_password",
        form,
        {
          onFinish: (data) => {
            resolve(data);
          },
        }
      );
    });
  },
  blockUser: (form) => {
    return new Promise((resolve) => {
      return router.put("/account/admin/settings/acl/user/block", form, {
        onFinish: (data) => {
          resolve(data);
        },
      });
    });
  },
  unblockUser: (form) => {
    return new Promise((resolve) => {
      return router.put("/account/admin/settings/acl/user/unblock", form, {
        onFinish: (data) => {
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

  const onBlockUser = async (username) => {
    await apiService.blockUser({
      username,
      motivation: null
    })
  }

  const onUnblockUser = async (username) => {
    await apiService.unblockUser({
      username,
      motivation: null
    })
  }

  const onDeleteUser = async (username) => {
    await apiService.deleteUser({
      username,
      motivation: null
    })
  }

  const onRedefineUserPassword = async (username) => {
    await apiService.redefinePassword({
      username,
    })
  }

  const errorHandler = () => true

  return {
    errorHandler,
    onRedefineUserPassword,
    onDeleteUser,
    onBlockUser,
    onSortChange,
    onUnblockUser
  }
}

import axios from 'axios'
import { router } from '@inertiajs/vue3'

export const apiService = {
  loadRoles: () => {
    return axios.get("/api/admin/settings/acl/roles/dropdown");
  },

  createUser: (form) => {
    return new Promise((resolve) => {
      return router.post("/account/admin/settings/acl/user", form, {
        onFinish: (data) => {
          resolve(data);
        },
      });
    });
  },
  deleteUser: (form) => {
    return new Promise((resolve) => {
      return router.delete("/account/admin/settings/acl/user", form, {
        onFinish: (data) => {
          resolve(data);
        },
      });
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

import {router} from '@inertiajs/vue3'

export const apiService = {
  createRole: async (form, redirect) => {
    return new Promise((resolve) =>
      router.post(
        "/account/admin/settings/acl/roles/create",
        {
          ...form,
          redirect,
        },
        {
          onFinish: () => {
            resolve();
          },
        }
      )
    );
  },

  updateRole: async (form) => {
    return new Promise((resolve) => {
      router.put("/account/admin/settings/acl/roles/edit", form, {
        onFinish: () => {
          resolve();
        },
      });
    });
  },

  deleteRole: async (roleId) => {
    return new Promise((resolve) =>
      router.delete(
        "/account/admin/settings/acl/roles/delete",
        {
          data: {
            roleId,
          },
        },
        {
          onFinish: () => {
            resolve();
          },
        }
      )
    );
  },
  deleteRoleBulk: async (roles) => {
    return new Promise((resolve) =>
      router.delete(
        "/account/admin/settings/acl/roles/delete/bulk",
        {
          data: {
            roles,
          },
        },
        {
          onFinish: () => {
            resolve();
          },
        }
      )
    );
  },
};

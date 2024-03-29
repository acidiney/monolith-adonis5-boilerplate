<!--
  - Copyright (c) 2023.
  - ITGest Angola
  -->

<script setup>
import { useI18n } from "vue-i18n";
import { usePage } from "@inertiajs/vue3";
import { computed, onMounted, reactive, ref } from "vue";

import { apiService } from "../services/api";

import { useHasPermission } from "@core/composables/has-permission";

const props = defineProps({
  dialogVisible: Boolean,
  selectedUser: Object,
});

const exactPermission = ref("admin-acl-create-user");
const isUpdating = ref(false);
const emit = defineEmits(["update:dialogVisible"]);

const { t } = useI18n();
const { checkPermission } = useHasPermission();

const ruleFormRef = ref();

const state = reactive({
  loading: false,
  loadingOptions: true,
  options: [],
});
const rules = reactive({
  firstName: [
    {
      required: true,
      message: t("admin.acl.users.validation.first_name.required"),
      trigger: "blur",
    },
  ],
  lastName: [
    {
      required: true,
      message: t("admin.acl.users.validation.last_name.required"),
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: t("admin.acl.users.validation.email.required"),
      trigger: "blur",
    },
    {
      type: "email",
      message: t("admin.acl.users.validation.email.email"),
      trigger: "blur",
    },
  ],
  role: [
    {
      required: true,
      message: t("admin.acl.users.validation.role.required"),
      trigger: "change",
    },
  ],
});

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  role: "",
});

const isRoot = computed(() => {
  if (form.role) {
    return state.options.find((o) => o.id === form.role).slug === "root";
  }

  return false;
});

const alert = computed(() => usePage().props.alert);

const onSubmit = async (formEl, createAndContinue) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      state.loading = true;

      if (isUpdating.value) {
        apiService
          .updateUser(props.selectedUser.username, { ...form, isModal: true })
          .then((data) => {
            if (data.props.alert.success) {
              formEl.resetFields();

              if (!createAndContinue) {
                emit("update:dialogVisible", false);
              }
            }
          })
          .finally(() => {
            state.loading = false;
          });

        return;
      }
      apiService
        .createUser({ ...form, isModal: true })
        .then((data) => {
          if (data.props.alert.success) {
            formEl.resetFields();

            if (!createAndContinue) {
              emit("update:dialogVisible", false);
            }
          }
        })
        .finally(() => {
          state.loading = false;
        });
    }
  });
};

onMounted(() => {
  apiService
    .loadRoles()
    .then(({ data }) => {
      state.options = data;

      if (props.selectedUser && props.selectedUser.username) {
        form.role = props.selectedUser.roleId;
      }
    })
    .finally(() => {
      state.loadingOptions = false;
    });

  if (props.selectedUser && props.selectedUser.username) {
    (form.email = props.selectedUser.email),
      (form.firstName = props.selectedUser.firstName),
      (form.lastName = props.selectedUser.lastName);

    exactPermission.value = "admin-acl-modify-user";
    isUpdating.value = true;
  }
});
</script>

<style scoped></style>

<template>
  <el-form
    ref="ruleFormRef"
    :rules="rules"
    label-position="top"
    label-width="100px"
    :model="form"
  >
    <el-dialog
      :model-value="dialogVisible"
      @close="$emit('update:dialogVisible', false)"
      :title="$t('admin.acl.users.register')"
      width="35%"
    >
      <div
        v-if="alert && alert.successWithModal"
        :class="[
          'alert',
          {
            'alert-success': alert.success,
          },
          {
            'alert-danger': !alert.success,
          },
        ]"
        role="alert"
      >
        {{ alert.message }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>

      <p class="text-muted">
        {{ $t("admin.acl.users.register.description") }}
      </p>

      <div
        class="alert alert-success alert-dismissible"
        v-if="$page.props.success"
      >
        {{ $t($page.props.success.createUser) }}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div
        class="alert alert-danger alert-dismissible"
        v-if="$page.props.errors"
      >
        {{ $t($page.props.errors.createUser) }}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <el-row>
        <el-col :span="11">
          <el-form-item prop="firstName" :label="$t('shared.user.first_name')">
            <el-input v-model="form.firstName" />
          </el-form-item>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-form-item prop="lastName" :label="$t('shared.user.last_name')">
            <el-input v-model="form.lastName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="email" :label="$t('shared.users.email')">
        <el-input native-type="email" v-model="form.email" />
      </el-form-item>
      <el-form-item prop="role" :label="$t('shared.users.role')">
        <el-select
          :loading="state.loadingOptions"
          :disabled="state.loadingOptions"
          class="w-100"
          v-model="form.role"
        >
          <el-option
            v-for="item in state.options"
            :key="item.id"
            :label="$t(item.name)"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-alert
        v-if="isRoot"
        type="info"
        :title="$t('shared.create.root.user')"
        :description="$t('shared.create.root.user.warning.description')"
        show-icon
      />

      <template #footer>
        <span class="dialog-footer">
          <el-button
            :loading="state.loading"
            v-if="!isUpdating"
            :disabled="!checkPermission(exactPermission)"
            @click.prevent="onSubmit(ruleFormRef, true)"
          >
            {{ $t("admin.acl.users.create") }}
          </el-button>
          <el-button
            :loading="state.loading"
            native-type="submit"
            :disabled="!checkPermission(exactPermission)"
            @click.prevent="onSubmit(ruleFormRef, false)"
            type="primary"
          >
            {{
              isUpdating
                ? $t("admin.acl.users.update")
                : $t("admin.acl.users.create_and_close")
            }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-form>
</template>

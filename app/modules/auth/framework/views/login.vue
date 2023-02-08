<script setup>
import { useI18n } from 'vue-i18n'
import { reactive, computed, ref} from "vue";
import { router, usePage } from "@inertiajs/vue3";

import AuthLayout from "./layouts/authentication.vue";

const state = reactive({
  username: '',
  password: '',
});

const isLoading = ref(false)

async function onSubmit(formEl) {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      isLoading.value = true;
      router.post("/auth/login", state, {
        onFinish: () => {
          isLoading.value = false;
        },
      });
    }
  })
}

const { t } = useI18n()

const ruleFormRef = ref()
const rules = reactive({
  username: [
    { required: true, message: t('auth.validation.username.required'), trigger: 'blur' },
    { type: 'email', message: t('auth.validation.username.email'), trigger: ['blur', 'change'] },
  ],
  password: [
    {
      required: true,
      message: t('auth.validation.password.required'),
      trigger: 'blur',
    },
    {
      min: 8,
      message: t('auth.validation.password.minLength'),
      trigger: 'change'
    }
  ],
})

const errors = computed(() => usePage().props.errors)
</script>

<template>
  <auth-layout>
    <el-form
      ref="ruleFormRef"
      :model="state"
      :rules="rules"
      class="no-required-exclamation"
      status-icon
      label-position="top"
    >
      <el-form-item  class="text-color" :label="$t('auth.frontend.field_email')" prop="username">
        <el-input
          name="username"
          v-model="state.username" />
      </el-form-item>
      <el-form-item :label="$t('auth.frontend.field_password')" prop="password">
        <el-input
          type="password"
          name="password"
          show-password
          v-model="state.password"
        />
      </el-form-item>

      <div class="animate-slide-in-link mt-3" style="margin-bottom: 19px">
        <router-link href="/auth/reset/password" class="cursor-pointer">{{
            $t("auth.frontend.forget_password_link")
          }}</router-link>
      </div>

      <el-button
        class="w-100"
        native-type="submit"
        type="primary"
        :loading="isLoading"
        @click.prevent="onSubmit(ruleFormRef)"
      >
        {{ $t("auth.frontend.login") }}

      </el-button>
    </el-form>
  </auth-layout>
</template>

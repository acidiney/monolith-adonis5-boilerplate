<script setup>
import { useI18n } from 'vue-i18n'
import { reactive, ref } from "vue";
import { router } from "@inertiajs/vue3";

import AuthLayout from "./layouts/authentication.vue";

const { t } = useI18n()

const ruleFormRef = ref()
const isLoading = ref(false);

const state = reactive({
  username: '',
});
const rules = reactive({
  username: [
    { required: true, message: t('auth.validation.username.required'), trigger: 'blur' },
    { type: 'email', message: t('auth.validation.username.email'), trigger: ['blur', 'change'] },
  ],
})

async function onSubmit(formEl) {
if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      isLoading.value = true;
      router.post("/auth/reset/send-mail", state, {
        onFinish: () => {
          isLoading.value = false;
        },
      })
    }
  })
}
</script>

<template>
  <auth-layout>
    <div class="mb-3">
      <p class="text-muted">
        {{ $t("auth.send_reset_password.description") }}
      </p>

      <el-form
        ref="ruleFormRef"
        :model="state"
        :rules="rules"
        class="no-required-exclamation"
        status-icon
        label-position="top"
      >
        <el-form-item :label="$t('auth.frontend.field_email')" prop="username">
          <el-input
            name="username"
            v-model="state.username" />
        </el-form-item>

        <div class="my-3">
          <router-link href="/auth/login">
            {{$t("auth.shared.back_login") }}
          </router-link>
        </div>

        <el-button
          class="w-100"
          native-type="submit"
          type="primary"
          :loading="isLoading"
          @click.prevent="onSubmit(ruleFormRef)"
        >
          {{ $t("auth.send_reset_password.send_link") }}
        </el-button>
      </el-form>
    </div>
  </auth-layout>
</template>

<script setup>
import {ref, reactive} from "vue";
import { useI18n } from 'vue-i18n'
import { router } from "@inertiajs/vue3";

import AuthLayout from "./layouts/authentication.vue";
import { usePasswordValidator } from '@core/composables/password-validator'

const props = defineProps({
  token: String
});

const isLoading = ref(false);


const { t } = useI18n()

const ruleFormRef = ref()


const ruleForm = reactive({
  password: '',
  confirmPassword: '',
})

const { newPasswordValidator, confirmPasswordValidator } = usePasswordValidator(ruleForm, ruleFormRef)

const rules = reactive({
  password: [{ validator: newPasswordValidator, trigger: 'blur'}, { min: 8, message: t('auth.validation.password.minLength'), trigger: 'blur'}],
  confirmPassword: [{ validator: confirmPasswordValidator, trigger: 'blur' }],
})

async function onSubmit(form) {
  if (!form) return

  await form.validate((isValid) => {
    if (!isValid) return

    isLoading.value = true;

    router.post(`/auth/reset/password`, {
      token: props.token,
      password: ruleForm.password,
      confirmPassword: ruleForm.confirmPassword
    }, {
      onFinish: () => {
        isLoading.value = false;
      },
    });
  })
}

</script>

<template>
  <auth-layout>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-position="top"
    >
      <p class="text-muted">
        {{ $t("auth.reset_password.description") }}
      </p>
      <el-form-item :label="$t('auth.reset_password.new_password')" prop="password">
        <el-input v-model="ruleForm.password" show-password type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('auth.reset_password.confirm_password')" prop="confirmPassword">
        <el-input
          v-model="ruleForm.confirmPassword"
          type="password"
          show-password
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          native-type="submit"
          class="w-100 mt-2"
          type="primary"
          @click.prevent="onSubmit(ruleFormRef)">
          {{ $t("auth.reset_password.button_label") }}
        </el-button>
      </el-form-item>
    </el-form>
  </auth-layout>
</template>

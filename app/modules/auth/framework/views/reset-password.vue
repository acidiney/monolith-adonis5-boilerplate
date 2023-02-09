<script setup>
import * as yup from "yup";
import {ref, computed, reactive} from "vue";
import { useI18n } from 'vue-i18n'
import { router, usePage } from "@inertiajs/vue3";

import AuthLayout from "./layouts/authentication.vue";
const props = defineProps({
  token: String
});

const isLoading = ref(false);
const showPassword = ref(false);


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

const { t } = useI18n()

const ruleFormRef = ref()

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(t('auth.validation.password.required')))
  } else {
    if (ruleForm.confirmPassword !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('confirmPassword', () => null)
    }
    // t('auth.validation.password.minLength')
    callback()
  }
}

const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(t('auth.validation.password.required')))
  } else if (value !== ruleForm.password) {
    callback(new Error(t('auth.validation.password.mismatch')))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  password: '',
  confirmPassword: '',
})

const rules = reactive({
  password: [{ validator: validatePass, trigger: 'blur'}, { min: 8, message: t('auth.validation.password.minLength'), trigger: 'blur'}],
  confirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
})

const errors = computed(() => usePage().props.errors)

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

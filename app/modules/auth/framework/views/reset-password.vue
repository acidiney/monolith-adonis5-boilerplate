<script setup>
import * as yup from "yup";
import { ref, computed } from "vue";
import { useI18n } from 'vue-i18n'
import { router, usePage } from "@inertiajs/vue3";
import {
  Field,
  Form,
  ErrorMessage,
} from "vee-validate";

import AuthLayout from "./layouts/authentication.vue";
const props = defineProps({
  token: String
});

const isLoading = ref(false);
const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

function onSubmit(values) {
  isLoading.value = true;

  router.post(`/auth/reset/password`, {
    token: props.token,
    password: values.password,
    confirmPassword: showPassword.value ? values.password : values.confirmPassword
  }, {
    onFinish: () => {
      isLoading.value = false;
    },
  });
}
const { t } = useI18n()

const schema = computed(() => ({
  password: yup.string()
    .required(t('auth.validation.password.required'))
    .min(8, t('auth.validation.password.minLength')),
  confirmPassword: showPassword.value
    ? yup.string().min(8)
    : yup.string().required().min(8),
}));
const errors = computed(() => usePage().props.errors)

</script>

<template>
  <auth-layout>
    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="mb-3">
        <p class="text-muted">
          {{ $t("auth.reset_password.description") }}
        </p>

        <label for="confirmPassword" class="mt-3">
          {{ $t("auth.reset_password.new_password") }}
        </label>

        <div class="input-group bg-light rounded flex mb-3 w-100">
          <Field
            name="password"
            id="password"
            class="form-control"
            :type="!showPassword ? 'password' : 'text'"
          />
          <span @click="toggleShowPassword" class="input-group-append">
            <button class="btn no-bg no-shadow" type="button">
              <app-icon
                :icon="showPassword ? 'eye' : 'eye-off'"
                class="text-fade"
              />
            </button>
          </span>
        </div>

        <div class="invalid-feedback d-block iva-feed">
          <ErrorMessage name="password" />
          <template v-if="errors && errors.password">
            <span v-for="error in errors.password"> {{ error }} </span>
          </template>
        </div>
      </div>

      <div class="mb-3" v-if="!showPassword">
        <label for="confirmPassword" class="mt-3">
          {{ $t("auth.reset_password.confirm_password") }}
        </label>
        <div class="input-group bg-light rounded flex w-100">
          <Field
            name="confirmPassword"
            id="confirmPassword"
            class="form-control"
            type="password"
          />
        </div>
        <div class="invalid-feedback d-block iva-feed">
          <ErrorMessage name="confirmPassword" />

          <template v-if="errors && errors.confirmPassword">
            <span v-for="error in errors.confirmPassword"> {{ error }} </span>
          </template>
        </div>
      </div>

      <app-button
        type="submit"
        :isLoading="isLoading"
        customClasses="btn btn-primary btn-block px-4"
        :loadingText="$t('auth.reset_password.button_label_event')"
      >
        {{ $t("auth.reset_password.button_label") }}
      </app-button>
    </Form>
  </auth-layout>
</template>

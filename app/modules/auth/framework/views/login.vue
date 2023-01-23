<script setup>
import * as yup from "yup";
import { reactive, computed } from "vue";
import { router, usePage } from "@inertiajs/vue3";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useI18n } from 'vue-i18n'

import AuthLayout from "./layouts/authentication.vue";

const state = reactive({
  showPassword: false,
  isLoading: false,
});

function toggleShowPassword() {
  state.showPassword = !state.showPassword;
}

function onSubmit(values) {
  state.isLoading = true;
  router.post("/auth/login", values, {
    onFinish: () => {
      state.isLoading = false;
    },
  });
}

const { t } = useI18n()
const schema = computed(() => ({
  username: yup.string().required(
    t('auth.validation.username.required')
  ).email(
    t('auth.validation.username.email')
  ),
  password: yup.string().required(
    t('auth.validation.password.required')
  ).min(8,
    t('auth.validation.password.minLength')
  ),
}));

const errors = computed(() => usePage().props.errors)
</script>

<template>
  <auth-layout>
    <Form @submit="onSubmit" :validation-schema="schema">
      <label for="username">{{ $t("auth.frontend.field_email") }}</label>

      <div class="input-group flex bg-light rounded">
        <Field class="form-control" name="username" id="username" />

        <span class="input-group-append">
          <button class="btn no-bg no-shadow" type="button">
            <app-icon icon="user" class="text-fade" />
          </button>
        </span>
      </div>
      <div class="invalid-feedback d-block iva-feed">
        <ErrorMessage name="username" />
        <template v-if="errors && errors.username">
          <span v-for="error in errors.username"> {{ error }} </span>
        </template>
      </div>

      <label for="password" class="mt-3">{{ $t("auth.frontend.field_password") }}</label>
      <div class="input-group bg-light rounded flex w-100">
        <Field
          name="password"
          id="password"
          class="form-control"
          :type="!state.showPassword ? 'password' : 'text'"
        />
        <span @click="toggleShowPassword" class="input-group-append">
          <button class="btn no-bg no-shadow" type="button">
            <app-icon
              :icon="!state.showPassword ? 'eye' : 'eye-off'"
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

      <div class="animate-slide-in-link mt-3" style="margin-bottom: 19px">
        <router-link href="/auth/reset/password" class="cursor-pointer">{{
  $t("auth.frontend.forget_password_link")
        }}</router-link>
      </div>

      <app-button
        type="submit"
        :isLoading="state.isLoading"
        customClasses="btn btn-primary btn-block px-4"
        :loadingText="$t('auth.frontend.login_event')"
      >
        {{ $t("auth.frontend.login") }}
      </app-button>
    </Form>
  </auth-layout>
</template>

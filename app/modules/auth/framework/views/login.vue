<template>
  <auth-layout>
    <v-form @submit="onSubmit" :validation-schema="schema">
      <label for="username">{{ $t('auth.field_email') }}</label>

      <div class="input-group flex bg-light rounded">
        <v-field class="form-control" name="username" id="username" />

        <span class="input-group-append">
          <button class="btn no-bg no-shadow" type="button">
            <app-icon icon="user" class="text-fade" />
          </button>
        </span>
      </div>
      <div class="invalid-feedback d-block iva-feed">
        <v-error-message name="username" />
        <template v-if="errors && errors.username">
          <span v-for="error in errors.username"> {{ error }} </span>
        </template>
      </div>

      <label for="password" class="mt-3">{{ $t('auth.field_password') }}</label>
      <div class="input-group bg-light rounded flex w-100">
        <v-field
          name="password"
          id="password"
          class="form-control"
          :type="!showPassword ? 'password' : 'text'"
        />
        <span @click="toggleShowPassword" class="input-group-append">
          <button class="btn no-bg no-shadow" type="button">
            <app-icon :icon="!showPassword ? 'eye' : 'eye-off'" class="text-fade" />
          </button>
        </span>
      </div>
      <div class="invalid-feedback d-block iva-feed">
        <v-error-message name="password" />
        <template v-if="errors && errors.password">
          <span v-for="error in errors.password"> {{ error }} </span>
        </template>
      </div>

      <div class="animate-slide-in-link mt-3" style="margin-bottom: 19px">
        <inertia-link href="/auth/reset/password" class="cursor-pointer">{{
          $t('auth.forgotPassword')
        }}</inertia-link>
      </div>

      <app-button
        type="submit"
        :isLoading="isLoading"
        customClasses="btn btn-primary btn-block px-4"
        :loadingText="$t('auth.loginEvent')"
      >
        {{ $t('auth.login') }}
      </app-button>
    </v-form>
  </auth-layout>
</template>

<script>
import AuthLayout from './layouts/authentication.vue'
import AppButton from '@core/components/AppButton.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { router } from '@inertiajs/vue3'

export default {
  props: ['errors'],
  components: {
    AuthLayout,
    AppButton,
    VField: Field,
    VForm: Form,
    VErrorMessage: ErrorMessage,
  },
  data() {
    return {
      showPassword: false,
      isLoading: false,
    }
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },

    onSubmit(values) {
      this.isLoading = true
      router.post('/auth/login', values, {
        onFinish: () => {
          this.isLoading = false
        },
      })
    },
  },

  computed: {
    schema() {
      return {
        username: yup.string().required().email(),
        password: yup.string().required().min(8),
      }
    },
  },
}
</script>

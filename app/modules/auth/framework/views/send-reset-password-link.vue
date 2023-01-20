<template>
  <auth-layout>
    <v-form @submit="onSubmit" :validation-schema="schema">
      <div class="input-group mb-3">
        <p class="text-muted">
          {{ $t('auth.resetPasswordInstructions') }}
        </p>

        <div class="w-100">
          <label for="username">E-mail</label>
          <div class="input-group bg-light rounded flex w-100 mb-1">
            <v-field name="username" id="username" class="form-control" />
            <span class="input-group-append">
              <button class="btn no-bg no-shadow" type="button">
                <app-icon icon="user" class="text-fade" />
              </button>
            </span>
          </div>
          <div class="invalid-feedback d-block iva-feed">
            <v-error-message name="username" />
          </div>
        </div>
      </div>

      <div class="my-3 animate-slide-in-link">
        <inertia-link href="/auth/login">{{ $t('auth.backToLogin') }}</inertia-link>
      </div>

      <app-button
        type="submit"
        :isLoading="isLoading"
        customClasses="btn btn-primary btn-block px-4"
        :loadingText="$t('auth.sendResetPasswordInstructionsEvent')"
      >
        {{ $t('auth.sendResetPasswordInstructions') }}
      </app-button>
    </v-form>
  </auth-layout>
</template>

<script>
import AuthLayout from './layouts/authentication.vue'
import AppButton from '@core/components/AppButton.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { Inertia } from '@inertiajs/inertia'

import * as yup from 'yup'
import { ref } from '@vue/reactivity'

export default {
  props: ['errors'],
  components: {
    AuthLayout,
    AppButton,
    VField: Field,
    VForm: Form,
    VErrorMessage: ErrorMessage,
  },

  setup() {
    const isLoading = ref(false)
    return { isLoading }
  },

  methods: {
    onSubmit(values) {
      this.isLoading = true
      Inertia.post('/auth/reset/send-mail', values, {
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
      }
    },
  },
}
</script>

<style scoped>
.Text-input-login {
  position: relative;
  width: 100%;
  height: 45px;
}
.input-login::placeholder {
  color: transparent;
}
.input-login {
  border: 1px solid #ddd;
  width: 100%;
  background: transparent;
  color: #000;
  height: 100%;
  border-radius: 5px;
  font-size: 12.5px;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.1s;
  outline: none;
  z-index: 1;
  padding: 0px 16px;
}
.label-login {
  z-index: 10;
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  /* background: #fff; */
  padding: 5px;
  font-size: 15px;
  color: #36404a;
  pointer-events: none;
  transition: all 0.2s;
}

.input-login:-internal-autofill-selected {
  /* appearance: menulist-button; */
  -webkit-appearance: none;
  background-color: #fff !important;
  background-image: none !important;
  /* color: -internal-light-dark(black, white) !important; */
}

.input-login:focus {
  border: 2px solid #1b66c9;
}
.input-login:focus + .label-login,
.input-login:not(:placeholder-shown) + .label-login {
  top: -8px;
  font-size: 12px;
  padding: 0 5px;
  z-index: 33;
  background: #fff;
  color: #36404a;
}

.icone-login {
  position: absolute;
  right: 0%;
  bottom: 0%;
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  padding: 5px 20px;
  background: #f5f5f7;
  top: 0;
  z-index: 444;
}

.zIndex {
  z-index: 00;
}
.icone-login i {
  font-size: 18px;
  background: #f5f5f7;
  color: black;
}

.loa {
  margin: 10px 0;
}

.animate-slide-in-link {
  animation: tranX 1s backwards;
}
.x {
  animation: tranX 1s 250ms backwards;
}
.k {
  animation: tranX 1s 350ms backwards;
}
.btn-login {
  animation: tranX 1s 400ms backwards;
}

@keyframes tranX {
  from {
    transform: translateX(-125%);
  }
  to {
    transform: translateX(0%);
  }
}

.iva-feed {
  position: absolute;
  bottom: 0;
  transform: translateY(23px);
  margin: 5px 0;
}
</style>

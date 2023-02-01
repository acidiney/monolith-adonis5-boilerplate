<script setup>
import * as yup from "yup";
import { router } from "@inertiajs/vue3";
import { ref, computed } from "@vue/reactivity";
import { Field, Form, ErrorMessage } from "vee-validate";
import AuthLayout from "./layouts/authentication.vue";

function onSubmit(values) {
  console.log(values)
  isLoading.value = true;
  router.post("/auth/reset/send-mail", values, {
    onFinish: () => {
      isLoading.value = false;
    },
  });
}

const schema = computed(() => ({
  username: yup.string().required().email()
}));

const isLoading = ref(false);

defineProps(["errors"]);
</script>


<template>
  <auth-layout>
    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="input-group mb-3">
        <p class="text-muted">
          {{ $t("auth.send_reset_password.description") }}
        </p>

        <div class="w-100">
          <label for="username">{{ $t('auth.send_reset_password.username') }}</label>
          <div class="input-group bg-light rounded flex w-100 mb-1">
            <Field name="username" type="email" id="username" class="form-control" />
            <span class="input-group-append">
              <button class="btn no-bg no-shadow" type="button">
                <app-icon icon="user" class="text-fade" />
              </button>
            </span>
          </div>
          <div class="invalid-feedback d-block iva-feed">
            <ErrorMessage name="username" />
          </div>
        </div>
      </div>

      <div class="my-3">
        <router-link href="/auth/login">
          {{$t("auth.shared.back_login") }}
        </router-link>
      </div>

      <app-button
        type="submit"
        :isLoading="isLoading"
        customClasses="btn btn-primary btn-block px-4"
        :loadingText="$t('auth.send_reset_password.send_link_event')"
      >
        {{ $t("auth.send_reset_password.send_link") }}
      </app-button>
    </Form>
  </auth-layout>
</template>

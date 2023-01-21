<script setup>
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

import AppFooter from '@core/components/Footer.vue'

const headers = computed(() => usePage().props.headers)
const messages = computed(() => ({
  errors: usePage().props.errors,
  success: usePage().props.success
}))

</script>

<style scoped>
.title {
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

h5 {
  font-weight: 300;
  font-size: 13pt;
  color: #9e9e9e;
  margin-bottom: 14px;
  padding: 15px;
}

.auth {
  height: 100vh;
}

.card {
  width: 450px;
  min-height: 400px;
}

main {
  height: 80%;
}
</style>

<template>
  <div class="auth d-flex align-items-center justify-content-center">
    <div class="card p-4">
      <div class="card-body h-100">
        <h1 class="title mb-1">{{ headers.appName }}</h1>
        <h5 class="mt-1 text-center text-muted">
          {{ headers.appDescription }}
        </h5>
        <main class="position-relative overflow-hidden">
          <div
            class="alert alert-danger fade show"
            v-if="messages.errors && messages.errors.invalid_credentials"
            role="alert"
          >
            {{ messages.errors.invalid_credentials }}
          </div>
          <div
            class="alert alert-success fade show"
            v-if="messages.success"
            role="alert"
          >
            {{ messages.success }}
          </div>
          <slot></slot>
        </main>
      </div>
      <app-footer center-text />
    </div>
  </div>
</template>


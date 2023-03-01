<script setup>
import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import { Head } from "@inertiajs/vue3";
import AppFooter from "@core/components/app-footer.vue";

const headers = computed(() => usePage().props.headers);
const alert = computed(() => usePage().props.alertGlobal);
const inProd = computed(() => usePage().props.inProd);
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
  margin-top: 7vh;
}

.card {
  width: 500px;
  min-height: 400px;
}

main {
  height: 80%;
}
</style>

<style>
.no-required-exclamation label::before {
  content: "" !important;
}

.el-form-item__label {
  color: unset !important;
}
</style>

<template>
  <Head :title="$page.props.headers.appName" />
  <div class="alert fade show mb-0 alert-warning" v-if="!inProd" role="alert">
    {{ $t("shared.inDevelopment") }}
  </div>
  <div class="auth d-flex justify-content-center">
    <div class="card p-4 py-5">
      <div class="card-body h-100">
        <h1 class="title mb-1 text-highlight">{{ headers.appName }}</h1>
        <h5 class="mt-1 text-center text-highlight text-muted">
          {{ headers.appDescription }}
        </h5>
        <main class="position-relative overflow-hidden">
          <div
            v-if="alert"
            :class="[
              'alert fade show',
              {
                'alert-danger': !alert.success,
              },
              {
                'alert-success': alert.success,
              },
            ]"
            role="alert"
          >
            {{ alert.message }}
          </div>
          <slot></slot>
        </main>
      </div>
      <app-footer center-text />
    </div>
  </div>
</template>

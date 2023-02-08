<script setup>
import {onMounted, ref, nextTick, computed} from "vue";
import AppHeader from "../core/components/app-header.vue";
import AppFooter from "../core/components/app-footer.vue";
import AppSidebar from "../core/components/app-sidebar.vue";
import { usePage } from "@inertiajs/vue3";

const animate = ref(false);
onMounted(() => {
  animate.value = true;

  nextTick(() => {
    if (window.initTheme) {
      window.initTheme();
    }
  });
});

const messages = computed(() => ({
  errors: usePage().props.errors,
  success: usePage().props.success
}))


const user = computed(() => (
 usePage().props.user
))

defineProps({
  title: String
})
</script>

<style scoped>
.page {
  position: relative;
}
</style>

<template>
  <app-head :title="title" />

  <div
    class="alert alert-warning fade show mb-0"
    v-if="user.role.slug === 'root'"
    role="alert"
  >
    {{ $t('shared.authenticated.root') }}
  </div>

  <div
    class="alert alert-danger fade show mb-0"
    v-if="messages.errors && messages.errors.message"
    role="alert"
  >
    {{ messages.errors.message }}
  </div>
  <div
    class="alert alert-success fade show mb-0"
    v-if="messages.success"
    role="alert"
  >
    {{ messages.success }}
  </div>
  <div class="layout-row">
    <app-sidebar />
    <div id="main" class="layout-column flex">
      <app-header />
      <div id="content" class="flex pt-1">
        <transition name="slide-fade">
          <template v-if="animate">
            <div>
              <slot name="header"></slot>

            <div class="page-content page-container-fluid">
              <div class="padding">
                <slot name="body"></slot>
              </div>
            </div>
            </div>
          </template>
        </transition>
      </div>
      <app-footer right-text />
    </div>
  </div>
</template>


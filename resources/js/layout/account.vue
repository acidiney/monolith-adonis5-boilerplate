<script setup type="ts" id="app-account">
import { onMounted, ref, nextTick, computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import AppHeader from "../core/components/app-header.vue";
import AppFooter from "../core/components/app-footer.vue";
import AppSidebar from "../core/components/app-sidebar.vue";

const animate = ref(false);

onMounted(() => {
  animate.value = true;

  nextTick(() => {
    if (window.initTheme) {
      window.initTheme()
    }
  });
});

const alert = computed(() => usePage().props.alertGloabl)


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
    :class="['alert fade show mb-0', {
      'alert-danger': !alert.success,
      'alert-success': alert.success
    }]"
    v-if="alert"
    role="alert"
  >
    {{ alert.message }}
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


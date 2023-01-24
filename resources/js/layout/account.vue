<script setup>
import { onMounted, ref, nextTick } from "vue";
import { Head } from "@inertiajs/vue3";
import AppHeader from "../core/components/app-header.vue";
import AppFooter from "../core/components/app-footer.vue";
import AppSidebar from "../core/components/app-sidebar.vue";

const animate = ref(false);
onMounted(() => {
  animate.value = true;

  nextTick(() => {
    if (window.initTheme) {
      window.initTheme();
    }
  });
});
</script>

<style scoped>
.page {
  position: relative;
}
</style>

<template>
  <Head :title="$page.props.headers.appName" />
  <div class="alert alert-danger mb-0" v-if="$page.props.errors" role="alert">
    {{ $page.props.errors }}
  </div>
  <div class="layout-row">
    <app-sidebar />
    <div id="main" class="layout-column flex">
      <app-header />
      <div id="content" class="flex">
        <transition name="slide-fade">
          <template v-if="animate">
            <div>
              <slot name="header"></slot>

            <div class="page-content page-container">
              <div class="padding">
                <slot name="body"></slot>
              </div>
            </div>
            </div>
          </template>
        </transition>
      </div>
      <app-footer />
    </div>
  </div>
</template>


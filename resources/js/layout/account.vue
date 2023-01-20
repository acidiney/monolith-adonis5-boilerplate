<template>
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
            <slot></slot>
          </template>
        </transition>
      </div>
      <app-footer />
    </div>
  </div>
</template>

<script>

import AppHeader from '../core/components/Header.vue'
import AppFooter from '../core/components/Footer.vue'
import AppSidebar from '../core/components/Sidebar.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    AppSidebar,
  },
  data() {
    return {
      animate: false,
    }
  },
  mounted() {
    this.animate = true

    this.$nextTick(() => {
      if (window.initTheme) {
        window.initTheme()
      }
    })
  },
}
</script>

<style scoped>
.page {
  position: relative;
}
</style>

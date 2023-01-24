<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { router } from '@inertiajs/vue3'

const props = defineProps({
  name: String,
  version: String,
  currentVersion: String,
  description: String,
  url: String,
  image: String,
});

const { t } = useI18n()

function loadInstallText () {
  if (!props.currentVersion) {
    return t('marketplace.addon.install')
  }

  if (currentVersion === version) {
    return $t('marketplace.addon.installed')
  }

  return $t('markeplace.addon.update')
}

const isLoading = ref(false)

function installOrUpdatePackage (addonName) {
  isLoading.value = true
  router.post('/admin/settings/marketplace/addon/install', {
    addonName
  }, {
    onFinish: () => {
      isLoading.value = false
    }
  })
}
</script>

<style scoped>
.card-footer {
  padding: 0.75rem 1.25rem !important;
}
</style>

<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex mb-3">
        <div class="logo">
          <img :src="image" />
        </div>
        <div class="meta ml-2">
          <h3 class="mb-0">{{ name }}</h3>
          <h6 class="text-muted text-light">{{ version }}</h6>
        </div>
      </div>
      <p class="text-muted">
        {{ description }}
      </p>
    </div>
    <div class="card-footer">
      <app-button
        type="button"
        @click="installOrUpdatePackage(name)"
        :disabled="version === currentVersion"
        :is-loading="isLoading"
        :class="{
          'btn-warning': version > currentVersion,
          'btn-primary': version,
          'btn-success': version === currentVersion,
        }"
      >
        {{ loadInstallText() }}
      </app-button>
    </div>
  </div>
</template>

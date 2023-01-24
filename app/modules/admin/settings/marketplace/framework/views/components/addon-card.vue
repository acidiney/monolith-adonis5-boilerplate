<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { router } from '@inertiajs/vue3'

const props = defineProps({
  name: String,
  version: Number,
  canInstall: Boolean,
  update: Boolean,
  description: String,
  url: String,
  image: String,
});

const { t } = useI18n()

function loadInstallText () {
  if (props.canInstall) {
    return t('marketplace.addon.install')
  }

  if (props.update) {
    return t('markeplace.addon.update')
  }

  return t('marketplace.addon.installed')
}

const isLoading = ref(false)

function installOrUpdatePackage (addonName, version) {
  isLoading.value = true
  router.post('/admin/settings/marketplace/addon/install', {
    addonName,
    version
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
        @click="installOrUpdatePackage(name, version)"
        :disabled="!canInstall"
        :is-loading="isLoading"
        :class="{
          'btn-warning': update,
          'btn-primary': canInstall,
          'btn-success': !canInstall,
        }"
      >
        {{ loadInstallText() }}
      </app-button>
    </div>
  </div>
</template>

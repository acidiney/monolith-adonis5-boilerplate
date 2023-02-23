<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { router } from '@inertiajs/vue3'

import { ElMessageBox } from 'element-plus'

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
  if (props.update) {
    return t('markeplace.addon.update')
  }
  
  if (props.canInstall) {
    return t('marketplace.addon.install')
  }


  return t('marketplace.addon.installed')
}

const isLoading = ref(false)

function installOrUpdatePackage (addonName, version) {
  

  ElMessageBox.confirm(
    t('marketplace.confirm_want_to_install_addon', { addonName, version }),
    t('shared.alert'),
    {
      confirmButtonText: t('shared.ok_proceed'),
      cancelButtonText: t('shared.no_thanks'),
      type: 'warning',
    }
  ).then(() => {
    isLoading.value = true
    router.post('/account/admin/settings/marketplace/addon/install', {
      addonName,
      version
    }, {
      onFinish: () => {
        isLoading.value = false
      }
    })
  })
}

const type = computed(() => {
  if (props.update) {
    return 'warning'
  }

  if (!props.canInstall) {
    return 'success'
  }

  return 'primary'
})
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
      <el-button
        :type="type"
        @click="installOrUpdatePackage(name, version)"
        :disabled="!canInstall"
        :loading="isLoading"
      >
        {{ loadInstallText() }}
      </el-button>
    </div>
  </div>
</template>

<script setup>

import { useI18n } from 'vue-i18n'
import { router } from '@inertiajs/vue3'



const props = defineProps({
  appSettings: {
    type: Object,
  },
});

const { t } = useI18n()




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
          <h3 class="mb-0">Teste</h3>

        </div>
      </div>

    </div>

  </div>
</template>

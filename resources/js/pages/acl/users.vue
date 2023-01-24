<template>
  <account-layout>
    <div>
      <app-page-hero title="Utilizadores" sub-title="Utilizadores da plataforma"/>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <app-table />
        </div>
      </div>
    </div>
  </account-layout>
</template>
<script>
import AppTable from '../../core/components/app-table.vue'
export default {
  components: {
    AppTable,
  },
}
</script>

<template>
  <account-layout>
    <div>
      <app-page-hero title="Componentes" sub-title="Crie componentes personalizados, para usar em seus templates"/>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <app-table />
        </div>
      </div>
    </div>
  </account-layout>
</template>
<script>
import AppTable from '../../core/components/AppTable.vue'
export default {
  components: {
    AppTable,
  },
}
</script>

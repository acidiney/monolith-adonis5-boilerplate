<template>
  <account-layout>
    <div>
      <app-page-hero title="Registos" sub-title="Acesse todos as actividades que aconteceram até o momento na plataforma."/>
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

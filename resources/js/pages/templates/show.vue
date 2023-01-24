<template>
  <account-layout>
    <div>
      <div class="d-flex flex fixed-content">
        <app-aside-content show-create-button @createClick="showModal = true" />

        <!-- template detail -->
        <div class="d-flex flex pr-md-3" id="content-body">
          <app-right-workstation />
        </div>
      </div>
      <n-modal v-model:show="showModal">
        <n-card style="width: 600px" title="Modal" :bordered="false" size="huge">
          <template #header-extra> Oops! </template>
          Content
          <template #footer> Footer </template>
        </n-card>
      </n-modal>
    </div>
  </account-layout>
</template>

<script>
import AppAsideContent from '../../core/components/app-aside-content.vue'
import AppRightWorkstation from '../../core/components/app-right-workstation.vue'

export default {
  components: {
    AppAsideContent,
    AppRightWorkstation,
  },
}
</script>

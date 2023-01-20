<template>
  <account-layout>
    <div class="d-flex flex fixed-content">
      <app-aside-content />
      <!-- template detail -->
      <div class="d-flex flex pr-md-3" id="content-body">
        <app-right-workstation />
      </div>
    </div>
  </account-layout>
</template>

<script>
import AppAsideContent from '../../core/components/AppAsideContent.vue'
import AppRightWorkstation from '../../core/components/AppRightWorkstation.vue'

export default {
  components: {
    AppAsideContent,
    AppRightWorkstation
  }
}
</script>

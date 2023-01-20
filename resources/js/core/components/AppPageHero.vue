<template>
  <div :class="['page-hero', { 'page-container': !notContainer }]" id="page-hero">
        <div class="padding d-flex">
          <div class="page-title">
            <h2 class="text-md text-highlight">{{ title }}</h2>
            <small class="text-muted">{{ subTitle }}</small>
          </div>
          <slot />
        </div>
      </div>
</template>
<script>
  export default {
    props: {
      title: String,
      subTitle: String,
      notContainer: Boolean
    }
  }
</script>

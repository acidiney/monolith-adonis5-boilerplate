<script setup>
defineProps({
  centerText: Boolean,
  rightText: Boolean,
})
</script>

<template>
  <footer id="footer" class="page-footer">
      <div :class="['p-3', centerText ? 'text-center' : '', rightText ? 'text-right': '']" >
          <span class="text-sm text-muted d-block">&copy; Copyright {{ $page.props.copyright }}</span>
          <div class="text-sm text-muted">{{ $t('shared.version') }} {{ $page.props.version }}</div>
      </div>
  </footer>
</template>


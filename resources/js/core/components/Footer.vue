<template>
  <div id="footer" class="page-footer hide">
      <div class="d-flex p-3">
          <span class="text-sm text-muted flex">&copy; Copyright {{ $page.props.copyright }}.</span>
          <div class="text-sm text-muted">Versão {{ $page.props.version }}</div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    centerText: {
      type: Boolean,
    }
  }
}
</script>

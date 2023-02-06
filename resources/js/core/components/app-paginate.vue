<script>
import CustomPagination from './app-custom-pagination.vue'

export default {
  props: {
    records: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      page: 1,
    }
  },
  methods: {
    handleChangePage() {
      this.$emit('paginate', this.page)
    },
  },
  computed: {
    options() {
      return {
        template: CustomPagination,
        texts: {
          count: 'Mostrando {from} à {to} de {count} registos|Mostrando {count} registos.|Mostrando 1 registo.',
        }
      }
    },
  },
}
</script>

<template>
  <div class="d-flex">

  </div>
</template>


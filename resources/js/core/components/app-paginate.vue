<script>
import Pagination from 'v-pagination-3'
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
  components: {
    VPagination: Pagination
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
    <v-pagination
      v-model="page"
      :records="records"
      :perPage="perPage"
      @paginate="handleChangePage"
      :options="options"
    />
  </div>
</template>


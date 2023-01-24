<template>
  <div class="">
    <table id="datatable" class="table table-theme table-row v-middle">
      <thead>
        <tr>
          <th v-for="(col, i) of columns" :key="'th_' + i">
            <span class="text-muted text-uppercase">{{ col.display }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) of rows" :key="'row_' + i">
          <td v-for="(col, i) of columns" :key="'td_' + i">
            <template v-if="col.isStatus">
              <app-status :status="row[col.field]" />
            </template>
            <template v-else-if="col.isLink">
              <inertia-link :href="row.href" />
            </template>
            <template v-else>
              {{ row[col.field] }}
            </template>
          </td>
          <td v-if="showOptions">
            <div class="item-action dropdown">
              <a data-toggle="dropdown" class="text-muted">
                <app-icon icon="more-horizontal" />
              </a>

              <div class="dropdown-menu dropdown-menu-right" role="menu">
                <template v-if="!customOption">
                  <a class="dropdown-item"> Visualizar </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item text-danger"> Eliminar item </a>
                </template>
                <slot v-bind="row" name="custom-options" />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td :colspan="columns.length + 1" class="text-right">
            <app-paginate :records="21" :per-page="10" @paginate="(page) => this.$emit('paginate', page)" />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import AppStatus from './app-status.vue'
import AppPaginate from './app-paginate.vue'
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    showOptions: {
      type: Boolean,
      default: true,
    },
    customOption: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppStatus,
    AppPaginate
  },
}
</script>

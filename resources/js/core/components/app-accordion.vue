<script setup lang="ts" id="app-accordion">
import { defineProps } from 'vue'
export interface AccordionRow {
  id: string
  title: string
}

defineProps<{
  title: string,
  rows: AccordionRow[]
}>()
</script>

<style scoped>

</style>

<template>
  <div id="accordion">
    <p class="text-muted">
      <strong>{{ $t('shared.permissions') }}</strong>
    </p>
    <template v-for="row in rows">
      <div class="card">
        <div
          class="d-flex align-items-center px-4 py-3 b-t pointer"
          data-toggle="collapse"
          data-parent="#accordion"
          :data-target="`#${row.id}`"
        >
          <i data-feather="lock"></i>
          <div class="px-3">
            <div>{{ row.title }}</div>
          </div>
          <div class="flex"></div>
          <div>
            <i data-feather="chevron-right"></i>
          </div>
        </div>
        <!-- div class="collapse p-4" id="c_2">
          <form role="form">
            <div class="form-group">
              <label>{{ $t('shared.old.password') }}</label>
              <input type="password" class="form-control" />
            </div>
            <div class="form-group">
              <label>{{ $t('shared.new.password') }}</label>
              <input type="password" class="form-control" />
            </div>
            <div class="form-group">
              <label>{{ $t('shared.confirm.new.password') }}</label>
              <input type="password" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary mt-2">{{ $t('shared.update') }}</button>
          </form>
        </div -->
      </div>
    </template>
  </div>
</template>

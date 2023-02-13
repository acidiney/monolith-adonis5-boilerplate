<script setup lang="ts" id="app-list-group">
import 'vue-i18n'
import {AccordionGroup} from "../interfaces/accordion-interface";

defineProps<{
  title: string,
  type: 'checkbox' | 'input'
  groups: AccordionGroup[]
}>()
</script>

<style scoped>

</style>

<template>
  <div id="list">
    <template v-for="group in groups">
      <p class="text-muted">
        <strong>{{ group.title }}</strong>
      </p>
      <div class="card d-flex  px-4 py-3 b-t pointer">
        <template v-for="child in group.children">
          <template v-if="type === 'checkbox'">
            <div class="d-flex align-items-center px-1">
              <div>{{ $t(child.title) }}</div>
              <div class="flex"></div>
              <span>
                <label class="ui-switch ui-switch-md">
                  <input type="checkbox" />
                  <i></i>
                </label>
              </span>
            </div>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>

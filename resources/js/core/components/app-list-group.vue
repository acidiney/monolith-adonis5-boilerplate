<script setup lang="ts" id="app-list-group">
import 'vue-i18n'
import { AccordionChild } from "../interfaces/accordion-interface";
import { computed } from "vue";

const props = defineProps<{
  groups: AccordionChild[]
  selected: string[]
}>()
const emit = defineEmits(['update:selected'])

const model = computed({
  get() {
    return props.selected;
  },
  set(value) {
    emit('update:selected', value);
  },
});


</script>

<template>
  <div class="card">
    <template v-for="child in groups">
      <div class="d-flex align-items-center px-4 py-3">
        <div>{{ $t(child.title) }}</div>
        <div class="flex"></div>
        <span>
          <label class="ui-switch ui-switch-md ui-switch-disabled">
            <input type="checkbox" name="option" :value="child.id" v-model="model" />
            <i></i>
          </label>
        </span>
      </div>
    </template>
</div>
</template>

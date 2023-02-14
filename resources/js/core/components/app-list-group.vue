<script setup lang="ts" id="app-list-group">
import 'vue-i18n'
import {AccordionGroup} from "../interfaces/accordion-interface";
import {computed} from "vue";

const props = defineProps<{
  type: 'checkbox' | 'input'
  groups: AccordionGroup[]
  selected: string[]
}>()
const emit = defineEmits(['updated:selected'])

const model = computed({
  get() {
    return props.selected;
  },
  set(value) {
    emit("update:selected", value);
  },
});


</script>

<template>
  <div id="accordion" class="w-100">
    <div class="card">
      <template v-for="group in groups">
      <div
          class="d-flex align-items-center px-3 py-3 b-t pointer"
          data-toggle="collapse"
          data-parent="#accordion"
          :data-target="`#${group.id}`"
      >
        <div>
          <h6 class="font-weight-500  m-0">{{ $t(group.title) }}</h6>
        </div>
        <div class="flex"></div>
        <div>
          <i data-feather="chevron-right"></i>
        </div>
      </div>
      <div class="collapse " :id="group.id">
        <div class="pointer b-t">
          <template v-for="child in group.children">
            <template v-if="type === 'checkbox'">
              <div class="d-flex align-items-center px-4 py-3">
                <div>{{ $t(child.title) }}</div>
                <div class="flex"></div>
                <span>
                <label class="ui-switch ui-switch-md">
                  <input
                     type="checkbox"
                     name="option"
                     :value="child.id"
                     v-model="model"
                  />
                  <i></i>
                </label>
              </span>
              </div>
            </template>
          </template>
        </div>
      </div>
      </template>
    </div>
  </div>
</template>

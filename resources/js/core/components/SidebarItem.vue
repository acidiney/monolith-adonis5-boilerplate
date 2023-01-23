<template>
  <li>
    <template v-if="!item.children">
      <router-link
        :href="item.url"
        :class="{ 'text-primary': $inertia.page.url === item.url  }"
      >
        <span class="nav-icon" v-if="item.icon"><i :data-feather="item.icon"></i></span>
        <span class="nav-text">{{ item.display }}</span>
      </router-link>
    </template>
    <template v-else>
      <a class="active">
        <span class="nav-icon" v-if="item.icon"><app-icon :icon="item.icon"/></span>
        <span class="nav-text">{{ item.display }}</span>
        <span class="nav-caret"></span>
      </a>
    </template>

    <ul class="nav-sub nav-mega" v-if="item.children">
      <sidebar-item
        v-for="(sub, i) in item.children"
        :key="i"
        :item="sub"
        :subSlide="true"
      ></sidebar-item>
    </ul>
  </li>
</template>
<script>
import { ref } from 'vue'

export default {
  name: 'sidebar-item',
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
    },
    subSlide: {
      type: Boolean,
    },
  },

  setup() {
    const iconFontSize = ref('16px')
    return { iconFontSize }
  },
}
</script>

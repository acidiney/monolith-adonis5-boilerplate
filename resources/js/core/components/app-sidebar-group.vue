<script setup>
import AppSidebarItem from './app-sidebar-item.vue'

defineProps(['menus'])
</script>

<template>
  <template v-for="(group, i) in menus" :key="i">
    <li class="nav-header hidden-folded" v-if="group.isGroup">
      <span class="text-muted">{{ $t(group.display) }}</span>
    </li>
    <li v-else>
      <a>
        <span class="nav-text">{{ $t(group.display) }}</span>
      </a>
    </li>
    <app-sidebar-item v-for="(item, v) in group.children" :key="'sub_' + v" :item="item" />
  </template>
</template>

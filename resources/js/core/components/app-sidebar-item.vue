<script setup>
defineProps({
  item: {
    type: Object,
  },
  index: {
    type: Number,
  },
  subSlide: {
    type: Boolean,
  },
});
</script>

<template>
  <li>
    <template v-if="!item.children">
      <router-link
        :href="item.url"
        :class="{ 'text-primary': $page.url.startsWith(item.url) }"
      >
        <span class="nav-icon" v-if="item.icon">
          <app-icon :icon="item.icon" />
        </span>
        <span class="nav-text">{{ $t(item.display) }}</span>
      </router-link>
    </template>
    <template v-else>
      <a class="active">
        <span class="nav-icon" v-if="item.icon"
          ><app-icon :icon="item.icon"
        /></span>
        <span class="nav-text">{{ $t(group.display) }}</span>
        <span class="nav-caret"></span>
      </a>
    </template>

    <ul class="nav-sub nav-mega" v-if="item.children">
      <app-sidebar-item
        v-for="(sub, i) in item.children"
        :key="i"
        :item="sub"
        :subSlide="true"
      ></app-sidebar-item>
    </ul>
  </li>
</template>

<script setup>
defineProps({
  workStationName: String,
  workStationEmptyText: String,
  isEmpty: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="d-flex flex-column flex card m-0 mb-md-3">
    <template v-if="!isEmpty">
      <div class="navbar flex-nowrap b-b">
        <button
          data-toggle="modal"
          data-target="#content-aside"
          data-modal
          class="d-md-none btn btn-sm btn-icon no-bg"
        >
          <span>
            <i data-feather="menu"></i>
          </span>
        </button>
        <span class="text-ellipsis flex mx-1">
          <span class="text-md text-highlight mx-2">{{ workStationName }}</span>
        </span>
        <span class="flex"></span>
        <div>
          <slot name="header-right"></slot>
        </div>
      </div>
    </template>

    <div
      :class="[
        'scrollable hover',
        { 'd-flex h-100 justify-content-center align-items-center': isEmpty },
      ]"
    >
      <template v-if="isEmpty">
        <p class="text-muted">
          {{ workStationEmptyText || "Workstation vazia" }}
        </p>
      </template>
      <slot v-else name="content"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
    handleClick: {
      type: Function,
      default: () => {},
    },
    disabled: {
      type: Boolean,
    },
    customClasses: {
      type: String,
    },
    type: {
      type: String,
      default: 'button',
    },
    isLoading: {
      type: Boolean,
    },
    loadingText: {
      type: String,
    },
    loadingTextColor: {
      type: String,
      default: '#fff',
    },
})
</script>

<style scoped>
button {
  cursor: pointer;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.spinner-border {
  height: 1em !important;
  width: 1em !important;
}
</style>

<template>
  <button
    @click="handleClick"
    :class="['btn mr-1 btn-square', customClasses, { 'cursor-not-allowed': disabled }]"
    :type="type"
    :disabled="isLoading || disabled"
  >
    <template v-if="isLoading">
      <span
        class="spinner-border"
        :style="{ color: loadingTextColor }"
        role="status"
        aria-hidden="true"
      ></span>
      {{ loadingText || $t('shared.loading') }}
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

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
      {{ loadingText }}
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

<script>
export default {
  props: {
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
      default: 'A carregar ...',
    },
    loadingTextColor: {
      type: String,
      default: '#fff',
    },
  },
}
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

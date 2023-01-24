<template>
    <v-feather
    v-bind="{
      type: icon,
      size,
    }"
  />
</template>

<script>
import VueFeather from 'vue-feather'
export default {
  props: ['icon', 'size'],
  components: {
    'v-feather': VueFeather,
  },
}
</script>

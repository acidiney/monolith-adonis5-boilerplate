<script setup>
import { Head } from '@inertiajs/vue3'

defineProps({ title: String })
</script>

<template>
  <Head :title="title ? `${title} - ${$page.props.headers.appName}` : $page.props.headers.appName">
    <slot />
  </Head>
</template>

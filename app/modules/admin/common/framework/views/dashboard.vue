<script setup>
import DashboardHead from './component/dashboard-head.vue'
import NoDashboard from "./component/no-dashboard.vue";

</script>

<template>
  <account-layout :title="$t('menu.main.dashboard')">
    <template v-slot:header>
      <DashboardHead></DashboardHead>
    </template>

    <template v-slot:body>
      <NoDashboard></NoDashboard>
    </template>
  </account-layout>
</template>

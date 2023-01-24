<script setup>
import AddonCard from "./components/addon-card.vue";
</script>

<style setup>
  #modules-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-auto-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 10px;
  }
</style>

<template>
  <account-layout :title="$t('menu.admin.setting.setup.addons')">
    <template v-slot:header>
      <app-page-hero
        :title="$t('menu.admin.setting.setup.addons')"
        :sub-title="$t('marketplace.addons.list-addons')"
      ></app-page-hero>
    </template>
    <template v-slot:body>
      <section id="modules-list">
        <addon-card v-for="addon of $page.props.addons" v-bind="addon" />
      </section>
    </template>
  </account-layout>
</template>

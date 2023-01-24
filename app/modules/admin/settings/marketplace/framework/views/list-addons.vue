<script setup>
  import AddonCard from './components/addon-card.vue'
</script>

<template>
  <account-layout>
      <template v-slot:header>
        <app-page-hero
          :title="$t('menu.admin.setting.setup.addons')"
          :sub-title="$t('marketplace.addons.list-addons')"
        ></app-page-hero>
      </template>
      <template v-slot:body>
        <addon-card
          v-for="addon of $page.props.addons"
          :addon-name="addon.name"
        />
      </template>
  </account-layout>
</template>

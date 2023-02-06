<script setup>
  import { useI18n } from 'vue-i18n'
  import AppTable from "@core/components/app-table.vue";
  import {computed, ref} from "vue";
  import {usePage} from "@inertiajs/vue3";


  const { t } = useI18n()

  const columns = ref([
    {
      display: t('acl.users.list-users.id'),
      field: 'id'
    },
    {
      display: t('acl.users.list-users.username'),
      field: 'fullName'
    },
    {
      display: t('acl.users.list-users.email'),
      field: 'email'
    },
    {
      display: t('shared.status'),
      field: 'status_id',
      isStatus: true
    },
    {
      display: t('acl.users.list-users.last_login'),
      field: 'last_login_at'
    },
    {
      display: t('acl.users.list-users.updated_at'),
      field: 'updated_at'
    },
  ])

  const content = computed(() => usePage().props.content)

</script>

<style scoped>

</style>


<template>
  <account-layout>
    <template v-slot:header>
      <app-page-hero
        :title="$t('menu.admin.setting.acl.users')"
        :sub-title="$t('menu.admin.setting.acl.users-description')"
      ></app-page-hero>
    </template>

    <template v-slot:body>
      <app-table :rows="content.data" :columns="columns" />
    </template>
  </account-layout>
</template>

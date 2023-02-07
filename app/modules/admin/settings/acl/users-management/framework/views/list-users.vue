<script setup>
import {computed, ref} from "vue"
import { useI18n } from 'vue-i18n'
import {usePage} from "@inertiajs/vue3"

import AppTable from "@core/components/app-table.vue"


  const { t } = useI18n()

  const columns = ref([
    {
      display: t('acl.users.list-users.id'),
      autoIncrement: true
    },
    {
      display: t('acl.users.list-users.username'),
      field: 'fullName',
      isLink: true,
      href: '/account/profile',
      param: 'slug'
    },
    {
      display: t('acl.users.list-users.email'),
      field: 'email'
    },
    {
      display: t('shared.status'),
      field: 'status',
      isStatus: true
    },
    {
      display: t('acl.users.list-users.last_login'),
      field: 'lastLoginAtText'
    },
    {
      display: t('acl.users.list-users.updated_at'),
      field: 'updatedAtText'
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

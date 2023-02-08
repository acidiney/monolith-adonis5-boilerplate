<script setup>
import {computed, ref} from "vue"
import { useI18n } from 'vue-i18n'
import {usePage} from "@inertiajs/vue3"

import AppStatus from "@core/components/app-status.vue";


  const { t } = useI18n()

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
      <el-table
          class="table-theme bg-body"
          header-cell-class-name="bg-body text-muted text-uppercase "
          size="large"
          stripe
          cell-class-name="bg-body text-color"
          :data="content.data"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="id" :label="$t('acl.users.list-users.id')" />
        <el-table-column prop="fullName" sortable :label="$t('acl.users.list-users.full_name')"  />
        <el-table-column prop="email" :label="$t('acl.users.list-users.email')" />
        <el-table-column prop="status" sortable :label="$t('shared.status')">
          <template #default="scope">
            <app-status :status="scope.row.status"  />
          </template>
        </el-table-column>
        <el-table-column prop="lastLoginAtText" sortable :label="$t('acl.users.list-users.last_login')" />
        <el-table-column prop="updatedAtText" sortable :label="$t('acl.users.list-users.updated_at')" />
      </el-table>
    </template>
  </account-layout>
</template>

<script setup>
import {computed, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import {usePage} from "@inertiajs/vue3"

import AppStatus from '@core/components/app-status.vue'
import AppCreateUserDialog
  from './components/app-create-user-dialog.vue'


const { t } = useI18n()
const dialogVisible = ref(false)

const content = computed(() => usePage().props.content)

const onSortChange = (e) => {
  console.log(e)
}

</script>

<style scoped>
.w-4 {
  width: 4% !important;
}
</style>


<template>
  <account-layout
    :title="$t('menu.admin.setting.acl.users')"
  >
    <template v-slot:header>
      <app-page-hero
        :title="$t('menu.admin.setting.acl.users')"
        :sub-title="$t('menu.admin.setting.acl.users-description')"
      >

        <div class="flex"></div>
        <div class="user-management-options">
          <el-dropdown @click="dialogVisible = true" split-button type="primary">
            {{ $t('admin.acl.users.register') }}
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <app-icon :size="14" icon="download-cloud" /> {{  $t('shared.export') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </app-page-hero>


    </template>

    <template v-slot:body>
      <el-table
          class="table-theme bg-body"
          header-cell-class-name="bg-body text-muted text-uppercase "
          size="large"
          stripe
          cell-class-name="bg-body text-color"
          :data="content.data"
          @sort-change="onSortChange"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="fullName" width="280" sortable :label="$t('acl.users.list-users.full_name')">
          <template #default="scope">
            <router-link :href="`/account/profile/${scope.row.slug}`">{{ scope.row.fullName }}</router-link> <br />
            <span class="sm">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roleText" :label="$t('acl.users.list-users.role')">
          <template #default="scope">
            {{ $t(scope.row.roleText) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" sortable :label="$t('shared.status')">
          <template #default="scope">
            <app-status :status="scope.row.status"  />
          </template>
        </el-table-column>
        <el-table-column prop="lastLoginAtText" min-width="100" sortable :label="$t('acl.users.list-users.last_login')">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #default>
                <div>{{ scope.row.lastLoginAt }}</div>
              </template>
              <template #reference>
                {{ scope.row.lastLoginAtText }}
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAtText" min-width="200" sortable :label="$t('shared.updated_at')">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #default>
                <div>{{ scope.row.updatedAt }}</div>
              </template>
              <template #reference>
                {{ scope.row.updatedAtText }}
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column fixed="right">
          <template #default>
            <el-dropdown split-button size="small" type="primary">
              {{ $t('shared.edit') }}
              <template #dropdown>
                <el-dropdown-menu >
                  <el-dropdown-item>{{ $t('admin.acl.reset_password') }}</el-dropdown-item>
                  <el-dropdown-item divided>{{ $t('admin.acl.inactivate') }}</el-dropdown-item>
                  <el-dropdown-item>{{ $t('admin.acl.impersonate') }}</el-dropdown-item>
                  <el-dropdown-item class="text-danger" divided>{{ $t('shared.remove') }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <div class="d-flex w-100 justify-content-between">
        <el-select class="w-4" model-value="10" size="small">
          <el-option
            v-for="item in [10, 50, 100]"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>

        <el-pagination
          :total="content.total"
          layout="prev, pager, next"
        />
      </div>

      <app-create-user-dialog
        v-if="dialogVisible"
        v-model:dialog-visible="dialogVisible" />
    </template>
  </account-layout>
</template>

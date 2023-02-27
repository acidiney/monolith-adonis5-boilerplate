<script setup>
import {computed, onMounted, reactive} from "vue"
import { useI18n } from 'vue-i18n'
import { apiService } from "./services/api";
import {usePage, router} from "@inertiajs/vue3"

import { useHasPermission } from '@core/composables/has-permission'
const { t } = useI18n()
const { checkPermission } = useHasPermission()

const state = reactive({
  perPage: 10,
  page: 1,
  loadingKey: null
})

const content = computed(() => usePage().props.content)
const alert = computed(() => usePage().props.alert)
const isRoot = computed(() => usePage().props.user.role.isRoot)

const onSortChange = ({ prop, order }) => {
  const orderBy = {
    'ascending': 'asc',
    'descending': 'desc'
  }

  redirectTo('', { sortBy: prop, sortOrderBy: orderBy[order]})
}

const redirectTo = (url, params) => {
  router.get(url, params)
}

const handleDeleteRole = (roleSlug, isInternal) => {

  if (isInternal && !isRoot.value) return

  apiService.deleteRole(roleSlug)
}

const canSelect = (row) => {
  return !row.isInternal
}

onMounted(() => {
  state.perPage = usePage().props.query.perPage
  state.page = usePage().props.query.pages
  state.loadingKey = null
})
</script>

<style scoped>
.w-4 {
  width: 4% !important;
}
</style>


<template>
  <account-layout
  :title="$t('menu.admin.setting.acl.roles')"
  >
    <template v-slot:header>
      <app-page-hero
        :title="$t('menu.admin.setting.acl.roles')"
        :sub-title="$t('menu.admin.setting.acl.roles_description')"
      >

        <div class="flex"></div>
        <div class="user-management-options">
          <el-dropdown
              :disabled="!checkPermission('admin-acl-create-role')"
              split-button
              type="primary"
          >
            <router-link class="text-white" href="/account/admin/settings/acl/roles/new">
              {{ $t('admin.acl.roles.register') }}
            </router-link>
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
      <p
          v-if="alert"
          :class="[
            'alert',
            {
              'alert-success': alert.success
            },
            {
              'alert-danger': !alert.success
            }
        ]">
        {{ alert.message }}
      </p>

      <el-table
          class="table-theme bg-body"
          header-cell-class-name="bg-body text-muted text-uppercase "
          size="large"
          stripe
          cell-class-name="bg-body text-color"
          :data="content.data"
      >
        <el-table-column type="selection" width="50"
        :selectable="canSelect"
        />
        <el-table-column prop="name" :label="$t('acl.roles.role_name')">
          <template #default="scope">

            <router-link :href="`/account/admin/settings/acl/roles/${scope.row.slug}/edit`">
              <span v-if="scope.row.isInternal">{{ $t(scope.row.name) }}</span>
              <span v-else>{{ scope.row.name }}</span>
            </router-link>

            <br />
            <span  v-if="scope.row.isInternal" class="small text-muted"> {{ $t(scope.row.description) }} </span>
            <span  v-else class="small text-muted"> {{ scope.row.description }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAtText" :label="$t('shared.updated_at')">
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
        <el-table-column :width="150" fixed="right">
          <template #default="scope">
            <el-dropdown
              split-button
              trigger="click"
              :hide-on-click="false"
              size="small"
              type="primary"
              :disabled="!checkPermission('admin-acl-modify-role') || (scope.row.isInternal && !isRoot) || state.loadingKey === scope.row.slug"
              @click="redirectTo(`/account/admin/settings/acl/roles/${scope.row.slug}/edit`)"
            >
              {{ $t('shared.edit') }}
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    :disabled="!checkPermission('admin-acl-delete-role') || scope.row.isInternal"
                    :class="{
                      'text-danger': !(!checkPermission('admin-acl-delete-role') || scope.row.isInternal)
                    }
                    ">
                    <el-popconfirm
                        :width="250"
                        :disabled="!checkPermission('admin-acl-delete-role') || scope.row.isInternal"
                        @confirm="handleDeleteRole(scope.row.slug, scope.row.isInternal)"
                        confirm-button-type="danger"
                        :confirm-button-text="$t('shared.ok_proceed')"
                        :cancel-button-text="$t('shared.no_thanks')"
                        :title="$t('shared.want_to_delete')"
                    >
                      <template #reference>
                        {{ $t('shared.remove') }}
                      </template>
                    </el-popconfirm>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex w-100 justify-content-between">
        <el-select
            class="w-4"
            size="small"
            v-model="state.perPage"
            @change="(perPage) => redirectTo('', { perPage, page: '1' })"
        >
          <el-option
            v-for="item in [5, 10, 50, 100]"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>

        <div class="d-flex justify-content-center align-items-center">
          {{ $t('shared.total_records', { total: content.total }) }}
          <el-pagination
              :total="content.total"
              :page-size="state.perPage"
              :current-page="state.page"
              layout="prev, pager, next"
              @size-change="(perPage) => redirectTo('', { perPage, page: 1 })"
              @currentChange="(page) => redirectTo('', { page })"
          />
        </div>
      </div>
    </template>
  </account-layout>
</template>

<script setup>
import {computed, ref} from "vue"
import { useI18n } from 'vue-i18n'
import {usePage, router} from "@inertiajs/vue3"

const { t } = useI18n()

const content = computed(() => usePage().props.content)

const onSortChange = (e) => {
  console.log(e)
}

const redirectTo = (url) => {
  router.get(url)
}

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
        :sub-title="$t('menu.admin.setting.acl.roles-description')"
      >

        <div class="flex"></div>
        <div class="user-management-options">
          <el-dropdown

              split-button
              type="primary"
          >
            <router-link class="text-white" href="/admin/settings/acl/roles/new">
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
        <el-table-column prop="name" sortable :label="$t('acl.roles.role_name')">
          <template #default="scope">

            <router-link :href="`/admin/settings/acl/roles/${scope.row.slug}/edit`">
              <span v-if="scope.row.isInternal">{{ $t(scope.row.name) }}</span>
              <span v-else>{{ scope.row.name }}</span>
            </router-link>

            <br />
            <span  v-if="scope.row.isInternal" class="small text-muted"> {{ $t(scope.row.description) }} </span>
            <span  v-else class="small text-muted"> {{ scope.row.description }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAtText" sortable :label="$t('shared.updated_at')">
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
              size="small"
              type="primary"
              @click="redirectTo(`/admin/settings/acl/roles/${scope.row.slug}/edit`)"
            >
              {{ $t('shared.edit') }}
              <template #dropdown>
                <el-dropdown-menu >
                  <el-dropdown-item class="text-danger">{{ $t('shared.remove') }}</el-dropdown-item>
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
    </template>
  </account-layout>
</template>

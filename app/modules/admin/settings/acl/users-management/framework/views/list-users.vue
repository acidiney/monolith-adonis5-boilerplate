<script setup>
import {computed, ref, watch, h} from 'vue'
import {usePage} from "@inertiajs/vue3"
import { apiService } from './services/api'
import AppStatus from '@core/components/app-status.vue'
import AppCreateUserDialog
  from './components/app-create-user-dialog.vue'
import { ElInput, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
const dialogVisible = ref(false)

const content = computed(() => usePage().props.content)
const alert = computed(() => usePage().props.alert)
const isRoot = computed(() => usePage().props.user.role.isRoot)

const { t } = useI18n()
watch(alert, () => {

  if (alert.value.successWithModal && alert.value.payload) {
    ElMessageBox.alert(h('div', null, [
      h('p', null, t('admin.acl.user.password.reseted')),
      h(ElInput, { disabled: true, modelValue: alert.value.payload.newPassword })
    ]), t('admin.acl.user.password.reseted.title'), {
    confirmButtonText: t('shared.ok_proceed'),
  })
  }
})
const onSortChange = (e) => {
  console.log(e)
}

const onBlockUser =  async (username) => {
  await apiService.blockUser({
    username,
    motivation: null
  })
}

const onUnblockUser =  async (username) => {
  await apiService.unblockUser({
    username,
    motivation: null
  })
}

const onDeleteUser =  async (username) => {
  await apiService.deleteUser({
    username,
    motivation: null
  })
}

const onRedefineUserPassword =  async (username) => {
  await apiService.redefinePassword({
    username,
  })
}

const errorHandler = () => true
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
      <p
          v-if="alert && !alert.successWithModal"
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
          @sort-change="onSortChange"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="avatar" width="70">
          <template #default="scope">
            <el-avatar :src="scope.row.avatar" :size="35" @error="errorHandler">
              {{ scope.row.fullName[0] }}
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="fullName" :min-width="180" sortable :label="$t('acl.users.list-users.full_name')">
          <template #default="scope">
            <router-link :href="`/account/profile/${scope.row.slug}`">{{ scope.row.fullName }}</router-link> <br />
            <a :href="`mailto:${scope.row.email}`" class="small text-muted">{{ scope.row.email }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="roleText" min-width="120" :label="$t('acl.users.list-users.role')">
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
        <el-table-column prop="updatedAtText" min-width="130" sortable :label="$t('shared.updated_at')">
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
          <template #default="scope">
            <el-dropdown
            trigger="click"
            :hide-on-click="false"
            :disabled="!isRoot && scope.row.roleSlug === 'root'" split-button size="small" type="primary">
              {{ $t('shared.edit') }}
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                  <el-popconfirm
                        :width="250"
                        :disabled="scope.row.isInternal"
                        @confirm="onRedefineUserPassword(scope.row.slug)"
                        confirm-button-type="warning"
                        :confirm-button-text="$t('shared.ok_proceed')"
                        :cancel-button-text="$t('shared.no_thanks')"
                        :title="$t('admin.acl.users.want_to_reset_password')"
                    >
                      <template #reference>
                        {{ $t('admin.acl.reset_password') }}
                      </template>
                    </el-popconfirm>


                </el-dropdown-item>
                  <el-dropdown-item
                  :disabled="scope.row.roleSlug === 'root'"
                  
                  v-if="scope.row.status === 'active'" divided>
                  <el-popconfirm
                        :width="250"
                        :disabled="scope.row.roleSlug === 'root'"
                        @confirm="onBlockUser(scope.row.slug)"
                        confirm-button-type="warning"
                        :confirm-button-text="$t('shared.ok_proceed')"
                        :cancel-button-text="$t('shared.no_thanks')"
                        :title="$t('admin.acl.users.want_to_deactivate')"
                    >
                      <template #reference>
                        {{ $t('admin.acl.inactivate') }}
                      </template>
                    </el-popconfirm>
                  
                  </el-dropdown-item>
                  <el-dropdown-item
                  :disabled="scope.row.roleSlug === 'root'"
                   
                  v-if="scope.row.status === 'inactive'" divided>
                  <el-popconfirm
                        :width="250"
                        :disabled="scope.row.roleSlug === 'root'"
                        @confirm="onUnblockUser(scope.row.slug)"
                        confirm-button-type="success"
                        :confirm-button-text="$t('shared.ok_proceed')"
                        :cancel-button-text="$t('shared.no_thanks')"
                        :title="$t('admin.acl.users.want_to_activate')"
                    >
                      <template #reference>
                        {{ $t('admin.acl.activate') }}
                      </template>
                    </el-popconfirm>
                  
                  </el-dropdown-item>
                  <!-- el-dropdown-item :disabled="scope.row.roleSlug === 'root'">{{ $t('admin.acl.impersonate') }}</el-dropdown-item -->
                  <el-dropdown-item
                    :disabled="scope.row.roleSlug === 'root'"
                    class="text-danger"
                    divided>
                    <el-popconfirm
                        :width="250"
                        :disabled="scope.row.roleSlug === 'root'"
                        @confirm="onDeleteUser(scope.row.slug)"
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

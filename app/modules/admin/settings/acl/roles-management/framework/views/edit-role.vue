<script setup>
import {computed, onMounted} from "vue"
import { usePage } from "@inertiajs/vue3"

import {apiService} from "./services/api"
import AppListGroup from "@core/components/app-list-group.vue"

import { useRoleForm } from './composable/use-role-form'

const { t, ruleForm, permissionsGroup, ruleFormRef, state, rules } = useRoleForm()

const alert = computed(() => usePage().props.alert)
const role = computed(() => usePage().props.role)


const onSubmit = async (formEl, redirect) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      state.loading = true;
      apiService.createRole(ruleForm, redirect)
          .then(() => {
            formEl.resetFields()
          })
          .finally(() => {
            state.loading = false;
          })
    }
  })
}

onMounted(() => {
  if (role.value) {
    ruleForm.name = role.value.internal ? t(role.value.name) : role.value.name
    ruleForm.description = role.value.internal ? t(role.value.description) : role.value.description
    ruleForm.permissions = role.value.permissions
  }
})

</script>

<template>
  <account-layout :title="$t('menu.admin.setting.acl.roles.new_role')">
    <template v-slot:header>
      <app-page-hero
        :title="$t('menu.admin.setting.acl.roles.edit_role')"
        :sub-title="$t('menu.admin.setting.acl.roles.edit_role_description')"
      />
    </template>

    <template v-slot:body>

      <p
          :class="[
            'alert',
            'alert-warning'
        ]">
        {{ $t('admin.acl.role.edit', { name: role.name }) }}
      </p>

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

      <p class="text-muted">
        {{ $t("admin.acl.roles.edit.description") }}
      </p>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-position="top"
        label-width="120px"
        status-icon
      >
      <!-- create role head -->
        <el-form-item :label="$t('acl.role.name')" prop="name">
          <el-input :disabled="role.internal" v-model="ruleForm.name" />
        </el-form-item>

        <el-form-item :label="$t('shared.description')" prop="description">
          <el-input :disabled="role.internal" v-model="ruleForm.description" type="textarea" />
        </el-form-item>

        <el-form-item :label="$t('shared.permissions')" prop="permissions">
          <app-list-group
              :groups="permissionsGroup"
              type="checkbox"
              v-model:selected="ruleForm.permissions"
          />
        </el-form-item>

        <div class="d-flex justify-content-between">
          <div>
            <span v-if="role.user"> {{ role.user.fullName }}</span><br />
            <span>{{ $t('shared.updated_at_with_date', { date: role.updatedAtText }) }}</span>
          </div>
          <el-button
              :loading="state.loading"
              @click.prevent="onSubmit(ruleFormRef, false)"
          > {{ $t('admin.acl.role.update') }} </el-button>
        </div>
      </el-form>
    </template>
  </account-layout>
</template>

<script setup>
import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";

import { apiService } from "./services/api";
import AppAccordion from "@core/components/app-accordion.vue";
import { useHasPermission } from '@core/composables/has-permission'

import { useRoleForm } from './composable/use-role-form'

const { ruleForm, permissionsGroup, ruleFormRef, state, rules } = useRoleForm()
const { checkPermission } = useHasPermission()

const alert = computed(() => usePage().props.alert)

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

</script>

<template>
  <account-layout :title="$t('menu.admin.setting.acl.roles.new_role')">
    <template v-slot:header>
      <app-page-hero
        :title="$t('menu.admin.setting.acl.roles.new_role')"
        :sub-title="$t('menu.admin.setting.acl.roles.new_role_description')"
      />
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
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </p>

      <p class="text-muted">
        {{ $t("admin.acl.roles.register.description") }}
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
          <el-input v-model="ruleForm.name" />
        </el-form-item>

        <el-form-item :label="$t('shared.description')" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" />
        </el-form-item>

        <el-form-item :label="$t('shared.permissions')" prop="permissions">
          <app-accordion
              :groups="permissionsGroup"
              type="checkbox"
              v-model:selected="ruleForm.permissions"
          />
        </el-form-item>

        <div class="d-flex justify-content-end">
          <el-button
              :loading="state.loading"
              :disabled="!checkPermission('admin-acl-create-role')"
              @click.prevent="onSubmit(ruleFormRef, false)"
          > {{ $t('admin.acl.roles.create') }} </el-button>
          <el-button
              native-type="submit"
              :disabled="!checkPermission('admin-acl-create-role')"
              @click.prevent="onSubmit(ruleFormRef, true)"
              :loading="state.loading"
              type="primary"
          >
            {{ $t('admin.acl.roles.create_and_redirect') }}
          </el-button>
        </div>
      </el-form>
    </template>
  </account-layout>
</template>

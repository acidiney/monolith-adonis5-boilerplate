<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import { usePage } from "@inertiajs/vue3";
import { useI18n } from 'vue-i18n'

import {apiService} from "./services/api";
import AppListGroup from "@core/components/app-list-group.vue";

const { t } = useI18n()
const ruleFormRef = ref()
const ruleForm = reactive({
  name: '',
  description: '',
  permissions: []
})
const state = reactive({
  loading: false
})

const rules = reactive({
  name: [
    { required: true, message: t('acl.role.name.required'), trigger: 'blur' },
    { min: 3,  message: t('acl.role.name.min'), trigger: 'blur' },
  ],
  permissions: [
    {
      type: 'array',
      required: true,
      message: t('acl.role.permissions.required'),
      trigger: 'change',
    },
  ],
  description: [
    { required: true, message: t('acl.role.description.required'), trigger: 'blur' },
  ],
})

const alert = computed(() => usePage().props.alert)
const permissions = computed(() => usePage().props.permissions)
const role = computed(() => usePage().props.role)
const permissionsGroup = ref(permissions.value.map((p) => ({
  id: p.id,
  title: p.title,
  children: p.children.map((c) => ({
    id: c.id,
    title: c.display,
    description: c.description
  }))
})))

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
    ruleForm.name = role.value.name;
    ruleForm.description = role.value.description;
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

<script setup>
import {reactive, ref} from "vue";
import AppAccordion from "@core/components/app-accordion.vue";

const ruleFormRef = ref()
const ruleForm = reactive({
  name: '',
  description: '',
  permissions: []
})

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  permissions: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  description: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})
</script>

<style scoped>

</style>

<template>
  <account-layout>
    <template v-slot:header>
      <app-page-hero
        :title="$t('menu.admin.setting.acl.roles.new_role')"
        :sub-title="$t('menu.admin.setting.acl.roles.new_role_description')"
      />
    </template>
    <template v-slot:body>
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
        <el-form-item label="Activity name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>

        <el-form-item label="Activity form" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" />
        </el-form-item>

      <!-- create role permissions -->

        <app-accordion />

      </el-form>
    </template>
  </account-layout>
</template>

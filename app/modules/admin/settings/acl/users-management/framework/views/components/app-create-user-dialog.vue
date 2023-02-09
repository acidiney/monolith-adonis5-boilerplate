<!--
  - Copyright (c) 2023.
  - ITGest Angola
  -->

<script setup>
  import {reactive, ref} from "vue";
  import {useI18n} from "vue-i18n";
  import {router} from "@inertiajs/vue3";

  import { loadRoles } from '../services/api'

  defineProps({
    dialogVisible: Boolean,
  })

  const { t } = useI18n()

  const state = reactive({
    loading: false,
    loadingOptions: true,
    options: []
  })

  const ruleFormRef = ref()

  const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  })

  const rules = reactive({
    firstName: [
      { required: true, message: t('admin.acl.users.validation.first_name.required'), trigger: 'blur' },
    ],
    lastName: [
      {
        required: true,
        message: t('admin.acl.users.validation.last_name.required'),
        trigger: 'blur',
      },
    ],
    email: [
      {
        required: true,
        message: t('admin.acl.users.validation.email.required'),
        trigger: 'blur',
      },
      {
        type: 'email',
        message: t('admin.acl.users.validation.email.email'),
        trigger: 'blur',
      }
    ],
    role: [
      {
        required: true,
        message: t('admin.acl.users.validation.role.required'),
        trigger: 'change',
      },
    ],
  })


  loadRoles().then(({ data }) => {
    console.log(data)
    state.options = data
  })
    .finally(() => {
      state.loadingOptions = false
    })

  const onSubmit = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
      if (valid) {
        state.loading = true;
        router.post("/admin/settings/acl/user", form, {
          onFinish: () => {
            state.loading = false;
          },
        });
      }
    })
  }

  defineEmits(['update:dialogVisible'])
</script>

<style scoped>

</style>

<template>
  <el-dialog
    :model-value="dialogVisible"
    @close="$emit('update:dialogVisible', false)"
    :title="$t('admin.acl.users.register')"
    width="35%"
  >
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      label-position="top"
      label-width="100px"
      :model="form"
    >
      <p class="text-muted">
        {{ $t("admin.acl.users.register.description") }}
      </p>
      <el-row>
        <el-col :span="11">
          <el-form-item prop="firstName" :label="$t('shared.user.first_name')">
            <el-input v-model="form.firstName" />
          </el-form-item>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-form-item prop="lastName" :label="$t('shared.user.last_name')">
            <el-input v-model="form.lastName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="email" :label="$t('shared.users.email')">
        <el-input native-type="email" v-model="form.email" />
      </el-form-item>
      <el-form-item prop="role" :label="$t('shared.users.role')">
          <el-select
            :loading="state.loadingOptions"
            :disabled="state.loadingOptions"
            class="w-100" v-model="form.role">
            <el-option
              v-for="item in state.options"
              :key="item.id"
              :label="$t(item.name)"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button > {{ $t('shared.cancel') }} </el-button>
        <el-button
          :loading="state.loading"
          @click.prevent="onSubmit(ruleFormRef)"
          type="primary">
          {{ $t('admin.acl.users.create') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

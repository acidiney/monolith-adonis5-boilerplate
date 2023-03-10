<script setup>
import { computed, onMounted } from "vue"
import { usePage } from "@inertiajs/vue3"

//import { apiService } from "./services/api"
import AppAccordion from "@core/components/app-accordion.vue";

import { useAppSettingForm } from './composable/app-settingse-form'
import { useHasPermission } from '@core/composables/has-permission'

const { appSettingFormRef,
    appSettingForm,
    state,
    appSetting, t } = useAppSettingForm()

//const { checkPermission } = useHasPermission()

const appSettings = computed(() => usePage().props.appSetting)





/* const onSubmit = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            state.loading = true;
            apiService.updateRole({
                roleSlug: role.value.slug,
                ...ruleForm
            })
                .then(() => {
                    formEl.resetFields()
                })
                .finally(() => {
                    state.loading = false;
                })
        }
    })
} */

onMounted(() => {

    if (appSettings.value) {
        appSettingForm.appName = appSettings.value.internal ? t(appSettings.value.appName) : appSettings.value.appName
        appSettingForm.appDesc = appSettings.value.internal ? t(appSettings.value.appDesc) : appSettings.value.appDesc
        appSettingForm.appColorPrimary = appSettings.value.internal ? t(appSettings.value.appColorPrimary) : appSettings.value.appColorPrimary
        appSettingForm.appColorSecondary = appSettings.value.internal ? t(appSettings.value.appColorSecondary) : appSettings.value.appColorSecondary
        appSettingForm.appBackgroundPrimaryColor = appSettings.value.internal ? t(appSettings.value.appBackgroundPrimaryColor) : appSettings.value.appBackgroundPrimaryColor
        appSettingForm.appBackgroundSecondaryColor = appSettings.value.internal ? t(appSettings.value.appBackgroundSecondaryColor) : appSettings.value.appBackgroundSecondaryColor

    }
    console.log('este', appSettings);
})

</script>

<template>
    <account-layout :title="$t('menu.admin.setting.acl.roles.edit_role')">
        <template v-slot:header>
            <app-page-hero :title="$t('menu.admin.setting.acl.roles.edit_role')"
                :sub-title="$t('menu.admin.setting.acl.roles.edit_role_description')" />
        </template>

        <template v-slot:body>

            <p :class="[
                'alert',
                'alert-warning'
            ]">
                {{ $t('admin.acl.role.edit', { name: appSettings.appName }) }}
            </p>

            <p v-if="alert" :class="[
                'alert',
                {
                    'alert-success': alert.success
                },
                {
                    'alert-danger': !alert.success
                }
            ]">
                {{ alert.message }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
            </p>

            <p class="text-muted">
                {{ $t("admin.acl.roles.edit.description") }}
            </p>
            <el-form ref="appSettingFormRef" :appSetting="appSetting" :model="appSettingForm" label-position="top"
                label-width="120px" status-icon>
                <!-- create role head -->
                <el-form-item :label="$t('acl.role.name')" prop="name">
                    <el-input :disabled="role.internal" v-model="appSettingForm.appName" />
                </el-form-item>

                <el-form-item :label="$t('shared.description')" prop="description">
                    <el-input :disabled="role.internal" v-model="appSettingForm.appDesc" type="textarea" />
                </el-form-item>



            </el-form>
        </template>
    </account-layout>
</template>

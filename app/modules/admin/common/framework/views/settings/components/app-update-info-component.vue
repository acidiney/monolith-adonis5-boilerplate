<script setup>
import { router, usePage } from "@inertiajs/vue3";
import { computed, ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { apiService } from '../../services/api'

const { t } = useI18n()

const updateUserInfoRef = ref()
const fileRef = ref()
const isLoading = ref()

const user = computed(() => usePage().props.user)


const updateUserForm = reactive({
    avatar: null,
    firstName: user.value.firstName,
    lastName: user.value.lastName,
})

const rules = reactive({
    firstName: [{ required: true, message:  t('common.first_name.required'), trigger: 'blur'}],
    lastName: [{ required: true, message: t('common.last_name.required'), trigger: 'blur' }],
})

const onSubmit = async (form) => {
    if (!form || isLoading.value) return

    await form.validate((isValid) => {
        if (!isValid) return
        
        isLoading.value = true

        const formData = new FormData()

        formData.append('avatar', null)
        if (updateUserForm.avatar) {
            formData.set('avatar', updateUserForm.avatar)
        }

        formData.append('firstName', updateUserForm.firstName)
        formData.append('lastName', updateUserForm.lastName)

        apiService.updateUserInfo(formData)
            .finally(() => {
                isLoading.value = false
            })
    })
}

const uploadFile = () => {
    updateUserForm.avatar = fileRef.value.files[0]
}

const useLogout = () => {
    router.post("/auth/logout");
};
</script>
<template>
    <div class="d-flex align-items-center px-4 py-3 pointer" data-toggle="collapse" data-parent="#accordion"
        data-target="#updateUserInfo">
        <div>
            <el-avatar class="bg-info-lt avatar w-48" :src="user.avatar" :alt="user.fullName" />
        </div>
        <div class="mx-3 d-none d-md-block">
            <strong>{{ user.fullName }}</strong>
            <div class="text-sm text-muted">{{ user.email }}</div>
        </div>
        <div class="flex"></div>
        <div class="mx-3">
            <i data-feather="chevron-right"></i>
        </div>
        <div>
            <a @click="useLogout" class="text-primary text-sm">{{ $t('shared.logout') }}</a>
        </div>
    </div>
    <div class="collapse p-4" id="updateUserInfo">
        <el-form ref="updateUserInfoRef" :model="updateUserForm" status-icon label-position="top" :rules="rules">
            <el-form-item :label="$t('shared.profile.picture')" prop="avatar">
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile" @change="uploadFile" ref="fileRef"/>
                    <label class="custom-file-label" for="customFile">{{ $t('shared.picture.choose') }}</label>
                </div>
            </el-form-item>
            <el-form-item :label="$t('shared.user.firstname')" prop="firstName">
                <el-input v-model="updateUserForm.firstName" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item :label="$t('shared.user.lastname')" prop="lastName">
                <el-input v-model="updateUserForm.lastName" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button class="mt-2" type="primary" :loading="isLoading" native-type="submit"
                    @click.prevent="onSubmit(updateUserInfoRef)">{{ $t('shared.update') }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
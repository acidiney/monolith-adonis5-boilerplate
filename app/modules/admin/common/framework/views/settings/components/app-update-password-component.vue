<script setup>
import { router } from '@inertiajs/vue3'
import { apiService } from '../../services/api'
import { ref, reactive } from 'vue'
import { usePasswordValidator } from '@core/composables/password-validator'

const updatePasswordRef = ref()
const isLoading = ref()


const updatePasswordForm = reactive({
  password: '',
  confirmPassword: '',
  currentPassword: '',
})

const { t, newPasswordValidator, confirmPasswordValidator } = usePasswordValidator(updatePasswordForm, updatePasswordRef)

const rules = reactive({
  newPassword: [{ validator: newPasswordValidator, trigger: 'blur' }, { min: 8, message: t('auth.validation.password.minLength'), trigger: 'blur'}],
  confirmPassword: [{ validator: confirmPasswordValidator, trigger: 'blur' }],
  currentPassword: [{ validator: newPasswordValidator, trigger: 'blur' }, { min: 8, message: t('auth.validation.password.minLength'), trigger: 'blur'}],
})

const onSubmit = async (form) => {
    if (!form || isLoading.value) return

    await form.validate((isValid) => {
        if (!isValid) return

        isLoading.value = true
        apiService.updatePassword({
            newPassword: updatePasswordForm.password,
            confirmPassword: updatePasswordForm.confirmPassword,
            currentPassword: updatePasswordForm.currentPassword
        })
            .finally(() => {
                isLoading.value = false
            })
    })
}

</script>

<template>
    <div>
        <div class="d-flex align-items-center px-4 py-3 b-t pointer" data-toggle="collapse" data-parent="#accordion"
            data-target="#change_password">
            <app-icon :size="18" icon="lock" />
            <div class="px-3">
                <div>{{ $t('shared.password') }}</div>
            </div>
            <div class="flex"></div>
            <div>
                <app-icon :size="18" icon="chevron-right" />
            </div>
        </div>
        <div class="collapse p-4" id="change_password">
            <el-form
                ref="updatePasswordRef"
                :model="updatePasswordForm"
                status-icon
                label-position="top"
                :rules="rules"
            >
                <el-form-item :label="$t('shared.old.password')" prop="currentPassword">
                    <el-input v-model="updatePasswordForm.currentPassword" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item :label="$t('shared.new.password')" prop="password">
                    <el-input v-model="updatePasswordForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item :label="$t('shared.confirm.new.password')" prop="confirmPassword">
                    <el-input
                        v-model="updatePasswordForm.confirmPassword"
                        type="password"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button class="mt-2" type="primary"
                    :loading="isLoading"
                    native-type="submit"
                    @click.prevent="onSubmit(updatePasswordRef)">{{ $t('shared.update') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
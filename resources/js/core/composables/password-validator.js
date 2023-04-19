import { useI18n } from 'vue-i18n'

export const usePasswordValidator = (ruleForm, ruleFormRef) => {
  const { t } = useI18n()

  const newPasswordValidator = (rule, value, callback) => {
    if (value === '') {
      callback(new Error(t('auth.validation.password.required')))
    } else {
      if (ruleForm.confirmPassword !== '') {
        if (!ruleFormRef.value) {
          return
        }
        ruleFormRef.value.validateField('confirmPassword', () => null)
      }
      // t('auth.validation.password.minLength')
      callback()
    }
  }
  const confirmPasswordValidator = (rule, value, callback) => {
    if (value === '') {
      callback(new Error(t('auth.validation.password.required')))
    } else if (value !== ruleForm.password) {
      callback(new Error(t('auth.validation.password.mismatch')))
    } else {
      callback()
    }
  }

  return {
    t,
    newPasswordValidator,
    confirmPasswordValidator,
  }
}

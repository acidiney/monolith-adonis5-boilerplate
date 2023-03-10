import { useI18n } from 'vue-i18n'
import { usePage } from '@inertiajs/vue3'
import { computed, onMounted, reactive, ref } from 'vue'


export const useAppSettingForm = () => {

    const { t } = useI18n()

    const appSettingFormRef = ref()

    const appSettingForm = reactive({
        appName: '',
        appDesc: '',
        appColorPrimary: '',
        appColorSecondary: '',
        appBackgroundPrimaryColor: '',
        appBackgroundSecondaryColor: '',
    })

    const state = reactive({
        loading: false,
    });

    const appSetting = reactive({
        appName: [
            { required: true, message: t('acl.role.name.required'), trigger: 'blur' },
            { min: 3, message: t('acl.role.name.min'), trigger: 'blur' },
        ],
        appDesc: [
            { required: true, message: t('acl.role.description.required'), trigger: 'blur' },
        ],
        appColorPrimary: [
            { required: true, message: t('acl.role.description.required'), trigger: 'blur' },
        ],
        appColorSecondary: [
            { required: true, message: t('acl.role.description.required'), trigger: 'blur' },
        ],
        appBackgroundPrimaryColor: [
            { required: true, message: t('acl.role.description.required'), trigger: 'blur' },
        ],
        appBackgroundSecondaryColor: [
            { required: true, message: t('acl.role.description.required'), trigger: 'blur' },
        ],
    })





    return {
        appSettingFormRef,
        appSettingForm,
        state,
        appSetting,
   
        t
    }
}

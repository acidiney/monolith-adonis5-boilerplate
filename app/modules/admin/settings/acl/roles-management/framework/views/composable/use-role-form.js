import { useI18n } from 'vue-i18n'
import { usePage } from '@inertiajs/vue3'
import {computed, onMounted, reactive, ref} from 'vue'


export const useRoleForm = () => {

    const { t } = useI18n()

    const ruleFormRef = ref()

    const ruleForm = reactive({
        name: '',
        description: '',
        permissions: []
    })

    const state = reactive({
      loading: false,
    });

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

    const permissions = computed(() => usePage().props.permissions)

    const permissionsGroup = ref(permissions.value.map((p) => ({
        id: p.id,
        title: p.title,
        children: p.children.map((c) => ({
          id: c.id,
          title: c.display,
          description: c.description
        }))
      })))

    return {
        ruleFormRef,
        ruleForm,
        state,
        rules,
        permissionsGroup,
        t
    }
}

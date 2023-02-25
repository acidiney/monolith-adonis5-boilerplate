import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

export const useHasPermission = () => {
    const permissions = computed(() => usePage().props.user.permissions)

    const checkPermission = (permission) => {
        return permissions.value.includes(permission)
    }

    return {
        checkPermission
    }
}
<script setup>
import {computed, reactive} from "vue";
import { usePage } from "@inertiajs/vue3";
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'
import AppListGroup from "@core/components/app-list-group.vue";
import AppUpdatePassword from './components/app-update-password-component.vue'
import AppUpdateInfo from './components/app-update-info-component.vue'

import { apiService } from "../services/api";

const props = computed(() => ({
  activeNotifications: usePage().props.activeNotifications,
  notifications: usePage().props.notifications,
  alert: usePage().props.alert
}))

const state = reactive({
  loading: null,
  activeNotifications: props.value.activeNotifications,
  changePassword: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
})

const selectedNotifications = (notifications, type) => {
  return notifications
    .filter((n) => n.type === type)
    .map((n) => n.id)
}

const { t } = useI18n()
const handleSelect = async (notificationId, type) => {

  if (state.loading) return

  state.loading = notificationId

  await apiService.updateNotifications({ notificationId, type })
      .then(({ data }) => {
        ElNotification({
          title: t('shared.success'),
          message: t(data.message),
          type: 'success',
        })

        state.activeNotifications = state.activeNotifications.filter((n) => n.type !== type)
        state.activeNotifications = [
            ...state.activeNotifications,
            ...notificationId.map((p) => ({
                id: p,
                type
              }))
        ]
      })
      .catch(({ response }) => {
        ElNotification({
          title: t('shared.error'),
          message: t(response.data.message),
          type: 'error',
        })
      })
      .finally(() => {
        state.loading = null
      })
}


</script>
<template>
  <account-layout :title="$t('menu.settings')">
    <template v-slot:header>
      <app-page-hero :title="$t('menu.settings')" :sub-title="$t('menu.settings.subtitle')" />
    </template>
    <template v-slot:body>
      <p
          v-if="props.alert"
          :class="[
            'alert',
            {
              'alert-success': props.alert.success
            },
            {
              'alert-danger': !props.alert.success
            }
        ]">
        {{ props.alert.message }}
      </p>

      <div id="accordion">
        <p class="text-muted">
          <strong>{{ $t('shared.account') }}</strong>
        </p>
        <div class="card">
          <app-update-info />
          
          <app-update-password />
        </div>

        <!-- NOTIFICATION BY PLATAFORM -->
        <p class="text-muted">
          <strong>{{ $t('shared.notifications') }}</strong>
        </p>
        <app-list-group
          :selected="selectedNotifications(state.activeNotifications, 'platform')"
          :groups="props.notifications"
          :disabled="!!state.loading"
          @update:selected="(n) => handleSelect(n, 'platform')"
        />

        <!-- NOTIFICATION BY E-MAIL -->
        <p class="text-muted">
          <strong>{{ $t('shared.notifications.email') }}</strong>
        </p>
        <app-list-group
          :selected="selectedNotifications(state.activeNotifications, 'email')"
          :disabled="!!state.loading"
          :groups="props.notifications"
          @update:selected="(n) => handleSelect(n, 'email')"
        />
      </div>
    </template>
</account-layout>
</template>

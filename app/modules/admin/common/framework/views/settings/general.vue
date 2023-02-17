<script setup>
import {computed, reactive} from "vue";
import { router, usePage } from "@inertiajs/vue3";
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'
import AppListGroup from "@core/components/app-list-group.vue";
import AppUpdatePassword from './components/app-update-password-component.vue'

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

const useLogout = () => {
  router.post("/auth/logout");
};
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
          <div class="d-flex align-items-center px-4 py-3 pointer" data-toggle="collapse" data-parent="#accordion"
            data-target="#c_1">
            <div>
              <span class="w-48 avatar circle bg-info-lt" data-toggle-class="loading">
                <img :src="$page.props.user.avatar" :alt="$page.props.user.fullName" />
              </span>
            </div>
            <div class="mx-3 d-none d-md-block">
              <strong>{{ $page.props.user.fullName }}</strong>
              <div class="text-sm text-muted">{{ $page.props.user.email }}</div>
            </div>
            <div class="flex"></div>
            <div class="mx-3">
              <i data-feather="chevron-right"></i>
            </div>
            <div>
              <a @click="useLogout" class="text-primary text-sm">{{ $t('shared.logout') }}</a>
            </div>
          </div>
          <div class="collapse p-4" id="c_1">
            <form role="form">
              <div class="form-group">
                <label>{{ $t('shared.profile.picture') }}</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="customFile" />
                  <label class="custom-file-label" for="customFile">{{ $t('shared.picture.choose') }}</label>
                </div>
              </div>
              <div class="form-group">
                <label>{{ $t('shared.user.firstname') }}</label>
                <input type="text" class="form-control" :value="$page.props.user.first_name" />
              </div>
              <div class="form-group">
                <label>{{ $t('shared.user.lastname') }}</label>
                <input type="text" class="form-control" :value="$page.props.user.last_name" />
              </div>
              <button type="submit" class="btn btn-primary mt-2">
                {{ $t('shared.update') }}
              </button>
            </form>
          </div>
          
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

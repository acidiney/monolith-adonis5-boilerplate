<script setup>
import { computed } from "vue";
import { router, usePage } from "@inertiajs/vue3";
import AppListGroup from "@core/components/app-list-group.vue";

const props = computed(() => ({
  activeNotifications: usePage().props.activeNotifications,
  notifications: usePage().props.notifications
}))

const selectedNotifications = (notifications, type) => {
  return notifications
    .filter((n) => n.type === type)
    .map((n) => n.id)
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
              <a @click="useLogout" class="text-prmary text-sm">{{ $t('shared.logout') }}</a>
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
                <label>{{ $t('shared.user.firsname') }}</label>
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
          <div class="d-flex align-items-center px-4 py-3 b-t pointer" data-toggle="collapse" data-parent="#accordion"
            data-target="#c_2">
            <i data-feather="lock"></i>
            <div class="px-3">
              <div>{{ $t('shared.password') }}</div>
            </div>
            <div class="flex"></div>
            <div>
              <i data-feather="chevron-right"></i>
            </div>
          </div>
          <div class="collapse p-4" id="c_2">
            <form role="form">
              <div class="form-group">
                <label>{{ $t('shared.old.password') }}</label>
                <input type="password" class="form-control" />
              </div>
              <div class="form-group">
                <label>{{ $t('shared.new.password') }}</label>
                <input type="password" class="form-control" />
              </div>
              <div class="form-group">
                <label>{{ $t('shared.confirm.new.password') }}</label>
                <input type="password" class="form-control" />
              </div>
              <button type="submit" class="btn btn-primary mt-2">{{ $t('shared.update') }}</button>
            </form>
          </div>

        </div>

        <!-- NOTIFICATION BY PLATAFORM -->
        <p class="text-muted">
          <strong>{{ $t('shared.notifications') }}</strong>
        </p>
        <app-list-group
          :selected="selectedNotifications(props.activeNotifications, 'plataform')"
          :groups="props.notifications"
        />

        <!-- NOTIFICATION BY E-MAIL -->
        <p class="text-muted">
          <strong>{{ $t('shared.notifications.email') }}</strong>
        </p>
        <app-list-group
          :selected="selectedNotifications(props.activeNotifications, 'email')"
          :groups="props.notifications"
        />
      </div>
    </template>
</account-layout>
</template>

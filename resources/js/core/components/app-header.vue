<script setup>
import AppUserSettings from './app-user-settings.vue'
import AppNotifications from './app-notification.vue'
import AppCustomApplicationSettings from './app-custom-application-settings.vue'
</script>

<template>
  <div id="header" class="page-header">
    <div class="navbar navbar-expand-lg">
      <app-logo />
      <ul class="nav navbar-menu order-1 order-lg-2">
        <li class="nav-item d-none d-sm-block">
          <a class="nav-link px-2 d-flex" data-toggle="fullscreen" data-plugin="fullscreen">
            <app-icon icon="maximize" :size="18" />
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link px-2 d-flex" data-toggle="dropdown">
            <app-icon icon="settings" :size="18" />
          </a>
          <app-custom-application-settings />
        </li>
        <!-- Notification -->
        <app-notifications />
        <!-- User dropdown menu -->
        <app-user-settings />
        <li class="nav-item d-lg-none">
          <a class="nav-link px-1" data-toggle="modal" data-target="#aside">
            <app-icon icon="menu" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

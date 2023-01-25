<script setup>
import AppUserSettings from './app-user-settings.vue'
import AppNotifications from './app-notification.vue'
import AppCustomApplicationSettings from './app-custom-application-settings.vue'
</script>

<template>
  <div id="header" class="page-header">
    <div class="navbar navbar-expand-lg">
      <!-- brand -->
      <app-logo />
      <!-- / brand -->
      <!-- Navbar collapse -->
      <!-- <div class="collapse navbar-collapse order-2 order-lg-1" id="navbarToggler">
        <form class="input-group m-2 my-lg-0">
          <div class="input-group-prepend">
            <button type="button" class="btn no-shadow no-bg px-0 text-inherit">
              <i data-feather="search"></i>
            </button>
          </div>
          <input
            type="text"
            class="form-control no-border no-shadow no-bg typeahead"
            placeholder="Search components..."
            data-plugin="typeahead"
            data-api="/vendor/api/menu.json"
          />
        </form>
      </div> -->
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

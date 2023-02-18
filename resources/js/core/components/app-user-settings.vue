<script setup>
import { router } from "@inertiajs/vue3";

const useLogout = () => {
  router.post("/auth/logout");
};
</script>

<template>
  <li class="nav-item dropdown">
    <a
      href="#"
      data-toggle="dropdown"
      class="nav-link d-flex align-items-center px-2 text-color user-dropdown"
    >
      <el-avatar :src="$page.props.user.avatar" :size="30" @error="() => true">
        {{ $page.props.user.fullName[0] }}
      </el-avatar>
    </a>
    <div class="dropdown-menu dropdown-menu-right w mt-3 animate fadeIn">
      <a class="px-4 py-2">
        <span>{{ $page.props.user.fullName }}</span>
      </a>
      <div class="dropdown-divider"></div>
      <router-link class="dropdown-item" :href="`/account/profile/${$page.props.user.slug}`">
        <span>{{ $t('menu.user.profile') }}</span>
      </router-link>
      <router-link class="dropdown-item" href="/account/settings">
        <span>{{ $t('menu.settings') }}</span>
      </router-link>
      <a class="dropdown-item button-logout" @click="useLogout">
      {{ $t('shared.logout') }}
    </a>
    </div>
  </li>
</template>

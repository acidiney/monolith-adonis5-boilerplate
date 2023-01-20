<template>
  <li class="nav-item dropdown">
    <a href="#" data-toggle="dropdown" class="nav-link d-flex align-items-center px-2 text-color">
      <span class="avatar w-24" style="margin: -2px"
        ><img src="/user-m.png" :alt="$page.props.user.fullName"
      /></span>
    </a>
    <div class="dropdown-menu dropdown-menu-right w mt-3 animate fadeIn">
      <a class="px-4 py-2">
        <span>{{ $page.props.user.fullName }}</span>
      </a>
      <div class="dropdown-divider"></div>
      <inertia-link class="dropdown-item" href="/admin/account/profile">
        <span>Meu perfil</span>
      </inertia-link>
      <inertia-link class="dropdown-item" href="/admin/account/settings">
        <span>Configurações da conta</span>
      </inertia-link>
      <a class="dropdown-item" @click="useLogout">Terminar sessão</a>
    </div>
  </li>
</template>
<script setup>
import { Inertia } from '@inertiajs/inertia'

const useLogout = () => {
  Inertia.post('/auth/logout')
}
</script>

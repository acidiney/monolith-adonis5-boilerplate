<template>
  <div id="aside" class="page-sidenav no-shrink bg-light nav-dropdown fade " aria-hidden="true">
    <div class="sidenav h-100 modal-dialog bg-light ">
      <!-- sidenav top -->
      <div class="navbar">
        <!-- brand -->
        <app-logo is-sidebar />
        <!-- / brand -->
      </div>
      <!-- Flex nav content -->
      <div class="flex scrollable hover">
        <div class="nav-active-text-primary" data-nav>
          <ul class="nav">
            <app-sidebar-group :menus="$page.props.menu" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSidebarGroup from './app-sidebar-group.vue'
</script>

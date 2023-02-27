<script setup id="app-account">
import {
  onMounted,
  onBeforeUnmount,
  ref,
  nextTick,
  computed,
  watch,
} from "vue";
import { usePage } from "@inertiajs/vue3";
import emitter from '../core/event-bus'
import AppHeader from "../core/components/app-header.vue";
import AppFooter from "../core/components/app-footer.vue";
import AppSidebar from "../core/components/app-sidebar.vue";
import SocketService from '../core/services/socket-io-client'

import { ElNotification } from "element-plus";
import { useI18n } from "vue-i18n";

const animate = ref(false);
const online = ref(navigator.onLine);
const showBackOnline = ref(false);

const { t } = useI18n()

const alert = computed(() => usePage().props.alertGlobal);

const user = computed(() => usePage().props.user);

onMounted(() => {
  animate.value = true;
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  nextTick(() => {
    if (window.initTheme) {
      window.initTheme();
    }

    SocketService.setupSocketConnection()

    SocketService.socket.emit('connected', {
      username: user.value.slug,
    })

    SocketService.socket.on('alert', (data) => {
      ElNotification({
        title: t(data.title),
        message: t(data.message),
        type: data.type,
        icon: data.icon,
        position: 'bottom-right',
        duration: 0,
      })

      if (data.eventName === 'USER_BLOCKED') {
        emitter.emit('logout')
      }
    })
  });
});

function updateOnlineStatus(e) {
  const { type } = e;
  online.value = type === "online";
}

watch(online, (v) => {
  if (v) {
    showBackOnline.value = true;

    setTimeout(() => {
      showBackOnline.value = false;
    }, 3000);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("online", updateOnlineStatus);
  window.removeEventListener("offline", updateOnlineStatus);
  SocketService.socket.disconnect();
});

defineProps({
  title: String,
});
</script>

<template>
  <app-head :title="title" />

  <div
    :class="[
      'alert fade show mb-0',
      {
        'alert-danger': !alert.success,
        'alert-success': alert.success,
      },
    ]"
    v-if="alert"

    role="alert"
  >
    {{ alert.message }}
  </div>

  <div
    :class="[
      'alert fade show mb-0',
      {
        'alert-danger': !online,
        'alert-success': showBackOnline,
      },
    ]"
    v-if="showBackOnline || !online"
    role="alert"
  >
    {{ showBackOnline ? $t("shared.back_to_online") : $t("shared.offline") }}
  </div>
  <div class="layout-row">
    <app-sidebar />
    <div id="main" class="layout-column flex">
      <app-header />
      <div id="content" class="flex pt-1">
        <transition name="slide-fade">
          <template v-if="animate">
            <div>
              <slot name="header"></slot>

              <div class="page-content page-container-fluid">
                <div class="padding">
                  <slot name="body"></slot>
                </div>
              </div>
            </div>
          </template>
        </transition>
      </div>
      <app-footer right-text />
    </div>
  </div>
</template>

<script setup id="app-notifications">
import { onMounted, ref } from 'vue'
import { apiService } from '../services/api-service'

const notifications = ref([])
const isLoading = ref(true)

onMounted(() => {
  apiService.notifications()
      .then(({ data }) => {
        notifications.value = data
      })
      .finally(() => {
        isLoading.value = false
      })
})

</script>

<style scoped>
.time {
  font-size: .8em;
}
</style>

<template>
  <li class="nav-item dropdown">
    <a class="nav-link px-2 pt-3 mr-lg-2" data-toggle="dropdown">
      <el-badge :is-dot="!!notifications.length">
        <app-icon icon="bell" :size="18" />
      </el-badge>
    </a>
    <!-- dropdown -->
    <div class="dropdown-menu dropdown-menu-right mt-3 w-md animate fadeIn p-0">
      <div class="scrollable hover" style="max-height: 250px">
        <div class="list list-row">
          <template v-for="notification of notifications">
            <div class="list-item pointer border-bottom">
            <!-- div>
                <span :class="['w-28 avatar',
                  {
                    'gd-danger': notification.eventType === 'danger',
                    'gd-success': notification.eventType === 'success',
                  }
                ]">
                </span>
            </div-->
            <div class="flex flex-column">
              <p class="m-0 font-weight-bold">{{ $t(notification.title) }}</p>
              <p class="m-0"> {{ $t(notification.message) }}</p>
              <span class="text-muted font-italic text-right d-block">
                <el-tooltip
                    :content="notification.createdAt"
                    placement="top"
                >
                  <small class="time">{{ notification.createdAtText}}</small>
                </el-tooltip>
              </span>
            </div>
          </div>
          </template>
          <template v-if="!notifications.length">
            <el-empty :description="$t('shared.empty')"
                    :image-size="100"
            />
          </template>
        </div>
      </div>
      <!-- div class="d-flex px-3 py-2 b-t" v-if="!isLoading && notifications.length">
        <a
          >{{ $t('shared.see_more') }}
          <i class="fa fa-angle-right text-muted"></i>
        </a>
      </div -->
    </div>
    <!-- / dropdown -->
  </li>
</template>

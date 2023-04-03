<script setup>
import { apiService } from "../services/api";
import { reactive, onMounted } from "vue";

const state = reactive({
  dashboard: null,
  refreshInterval: null,
  refreshIntervalOptions: [],
  dashboardListOptions: [],
});

onMounted(async () => {
  await Promise.all([
    apiService.retrieveDashboardRefreshOptions(),
    apiService.retrieveDashboardSettings(),
  ]).then((result) => {
    if (result[0]) {
      state.refreshIntervalOptions = result[0].options;
      state.refreshInterval = result[0].default;
    }

    if (result[1]) {
      state.dashboardListOptions = result[1];
      const defaultOption = state.dashboardListOptions.find((o) => o.default);

      if (defaultOption) {
        state.dashboard = defaultOption.id;
      }
    }
  });
});
</script>
<template>
  <app-page-hero
    :title="$t('menu.main.dashboard')"
    :sub-title="
      $t('admin.page_hero.common.dashboard.subtitle', {
        name: $page.props.user.fullName,
      })
    "
  >
    <div class="flex"></div>
    <div class="refresh-dashboard-timer mr-2">
      <el-select
        v-model="state.dashboard"
        class="m-2"
        :placeholder="$t('common.dashboard.select_dashboard')"
        size="default"
      >
        <el-option
          v-for="item in state.dashboardListOptions"
          :key="item.id"
          :label="item.display"
          :value="item.id"
        />
      </el-select>
    </div>
    <div>
      <el-select
        v-model="state.refreshInterval"
        class="m-2"
        :placeholder="$t('common.dashboard.select_refresh_interval')"
        size="default"
      >
        <el-option
          v-for="item in state.refreshIntervalOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
  </app-page-hero>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { usePage } from "@inertiajs/vue3";

const dashboardListOptions = ref([
  {
    display: 'Dashboard 1',
    id: 'default'
  },
])

const refreshIntervalOptions = ref([
  '5sec',
  '5min',
  '10min',
  ' 30min',
  '1h'
])

const state = reactive({
  dashboard: 'default',
  refreshInterval: '5sec'
})

const errors = computed(() => usePage().props.errors)
</script>

<template>
  <account-layout :title="$t('menu.main.dashboard')">
    <template v-slot:header>
      <app-page-hero :title="$t('menu.main.dashboard')" :sub-title="
        $t('admin.page_hero.common.dashboard.subtitle', {
          name: $page.props.user.fullName,
        })
      ">
        <div class="flex"></div>
        <div class="refresh-dashboard-timer mr-2">
          <el-select v-model="state.dashboard" class="m-2" :placeholder="$t('common.dashboard.select_dashboard')"
            size="default">
            <el-option v-for="item in dashboardListOptions" :key="item.id" :label="item.display" :value="item.id" />
          </el-select>
        </div>
        <div>
          <el-select v-model="state.refreshInterval" class="m-2"
            :placeholder="$t('common.dashboard.select_refresh_interval')" size="default">
            <el-option v-for="item in refreshIntervalOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
      </app-page-hero>
    </template>

    <template v-slot:body>
      <div class="row" data-plugin="chartist">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <strong>World Map</strong>
            </div>
            <div class="row no-gutters">
              <div class="col-sm-6">
                <div class="p-4">
                  <div id="jqvmap-world" data-plugin="vectorMap" style="height: 240px"
                    class="d-flex align-items-center justify-content-center">
                    <div class="loading"></div>
                  </div>
                </div>
              </div>
              <div class="col-sm-3 p-4">
                <div class="">
                  <div class="my-2">
                    <small class="text-muted"> North America </small>
                    <div class="progress no-bg align-items-center mt-2 circle">
                      <div class="progress-bar bg-primary" style="width: 45%"></div>
                      <span class="ml-2 text-muted">45%</span>
                    </div>
                  </div>
                  <div class="my-2">
                    <small class="text-muted"> Europe </small>
                    <div class="progress no-bg align-items-center mt-2 circle">
                      <div class="progress-bar bg-success" style="width: 25%"></div>
                      <span class="ml-2 text-muted">30%</span>
                    </div>
                  </div>
                  <div class="my-2">
                    <small class="text-muted"> Asia </small>
                    <div class="progress no-bg align-items-center mt-2 circle">
                      <div class="progress-bar bg-info" style="width: 10%"></div>
                      <span class="ml-2 text-muted">10%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-3 b-l">
                <div class="p-4 text-center b-b">
                  <h3 class="m-0">Asia</h3>
                </div>
                <div class="p-4 row text-center">
                  <div class="col b-r">
                    1200
                    <div class="text-muted text-sm">Cities</div>
                  </div>
                  <div class="col">
                    350,000
                    <div class="text-muted text-sm">Population</div>
                  </div>
                </div>
                <div class="p-4 text-center text-center">
                  <span class="text-md text-primary">65%</span>
                  <div class="text-muted text-sm">Profit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Bar chart</div>
            <div class="card-body">
              <div id="chartist-bar" class="pos-rlt" style="height: 240px"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Horizental bar chart</div>
            <div class="card-body">
              <div id="chartist-h-bar" class="pos-rlt" style="height: 240px"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Pie chart</div>
            <div class="card-body">
              <div id="chartist-pie" class="pos-rlt" style="height: 240px"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Dougnut chart</div>
            <div class="card-body">
              <div id="chartist-dougnut" class="pos-rlt" style="height: 240px"></div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </account-layout>
</template>
